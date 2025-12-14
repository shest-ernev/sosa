import { InjectRepository } from '@nestjs/typeorm'
import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { Repository, ILike } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

import { UserEntity, UserSettingsEntity } from '@/database/entities'
import { CodeService } from '@/shared/services'

import {
  SignUpCheckCodeBody,
  SignUpCreateTokenBody,
  SignUpSendCodeBody,
} from '../schemas'

export class SignUpService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly usersSettingsRepository: Repository<UserSettingsEntity>,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService
  ) {}

  async createToken(params: SignUpCreateTokenBody) {
    const { name, email } = params

    const userConflict = await this.usersRepository.findOne({
      where: [{ email: ILike(email.trim()) }, { name: ILike(name.trim()) }],
    })

    if (userConflict) {
      throw new ConflictException('Such a user already exists')
    }

    const newUser = this.usersRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    })

    const user = await this.usersRepository.save(newUser)

    const newSettings = this.usersSettingsRepository.create({
      userId: user.id,
    })

    const settings = await this.usersSettingsRepository.save(newSettings)

    setTimeout(async () => {
      const checkUser = await this.usersRepository.findOne({
        where: { id: user.id },
      })

      if (checkUser && !checkUser.isActive) {
        await this.usersSettingsRepository.delete({ id: settings.id })
        await this.usersRepository.delete({ id: checkUser.id })
      }
    }, 600000)

    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' }
    )

    const code = await this.codeService.update(user.id)

    await this.codeService.send(user.id, code)

    return { token }
  }

  async checkCode(params: SignUpCheckCodeBody) {
    const { token, code } = params

    const { id } = await this.jwtService.verifyAsync<{ id: string }>(token)

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new UnauthorizedException('Not correct code')
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' }
    )

    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '30d' }
    )

    await this.usersRepository.update(
      { id: user.id },
      { isActive: true, refreshToken }
    )

    await this.codeService.delete(user.id)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async sendCode(params: SignUpSendCodeBody) {
    const { token } = params

    const { id } = await this.jwtService.verifyAsync<{ id: string }>(token)

    const code = await this.codeService.update(id)

    await this.codeService.send(id, code)

    return { message: 'Email send' }
  }
}
