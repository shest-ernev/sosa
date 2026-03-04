import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Repository, ILike } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UserEntity } from '@/database/entities'
import { CodeService } from '@/shared/services'

import {
  SignInCheckCodeBody,
  SignInCheckPassBody,
  SignInCreateTokenBody,
  SignInSendCodeBody,
} from '../schemas'

export class SignInService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
  ) {}

  async createToken(params: SignInCreateTokenBody) {
    const email = params.email.trim()

    const user = await this.usersRepository.findOne({
      where: { email: ILike(email) },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' },
    )

    await this.codeService.update(user.id)

    await this.codeService.send(user.id)

    return { token }
  }

  async checkCode(params: SignInCheckCodeBody) {
    const { code, token } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new BadRequestException('Wrong code')
    }

    if (user.password) {
      const passwordToken = await this.jwtService.signAsync({
        code: user.code,
        id: user.id,
      })

      return {
        token: passwordToken,
      }
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' },
    )

    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '30d' },
    )

    await this.usersRepository.update(
      { id: user.id },
      { refreshToken, code: '' },
    )

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async checkPass(params: SignInCheckPassBody) {
    const { token, password } = params

    const { id, code } = await this.jwtService
      .verifyAsync<{
        id: string
        code: string
      }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new BadRequestException('Wrong code')
    }

    const isCompareCode = await bcrypt.compare(password, user.password)

    if (!isCompareCode) {
      throw new BadRequestException('Wrong password')
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '10m' },
    )

    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '30d' },
    )

    await this.usersRepository.update(
      { id: user.id },
      { refreshToken, code: '' },
    )

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async sendCode(params: SignInSendCodeBody) {
    const { token } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    await this.codeService.send(id)

    return { message: 'Email send' }
  }
}
