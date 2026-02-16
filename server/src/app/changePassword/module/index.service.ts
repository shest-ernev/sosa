import { ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CodeService } from '@/shared/services'
import { UserEntity } from '@/database/entities'

import {
  ChangePasswordCheckCodeBody,
  ChangePasswordEmailBody,
  ChangePasswordNewBody,
  ChangePasswordSendCodeBody,
} from '../schemas'

export class ChangePasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
  ) {}

  async email(params: ChangePasswordEmailBody) {
    const { email } = params

    const user = await this.usersRepository.findOne({
      where: { email: ILike(email) },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const code = await this.codeService.update(user.id)

    await this.codeService.send(user.id, code)

    const token = await this.jwtService.signAsync({ id: user.id })

    return { token }
  }

  async checkCode(params: ChangePasswordCheckCodeBody) {
    const { token, code } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new BadRequestException('Invalid token')
      })

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new BadRequestException('Wrong code')
    }

    const newToken = await this.jwtService.signAsync({
      id: user.id,
      code,
    })

    return { token: newToken }
  }

  async newPass(paarms: ChangePasswordNewBody) {
    const { token, password } = paarms

    const { id, code } = await this.jwtService.verifyAsync<{
      id: string
      code: string
    }>(token)

    const user = await this.codeService.compare(id, code)

    if (!user) {
      if (!user) {
        throw new BadRequestException('Wrong code')
      }
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    await this.usersRepository.update(
      { id: user.id },
      {
        password: passwordHash,
        code: '',
      },
    )

    return { message: 'Password changed' }
  }

  async sendCode(params: ChangePasswordSendCodeBody) {
    const { token } = params

    const { id } = await this.jwtService.verifyAsync<{ id: string }>(token)

    const code = await this.codeService.update(id)

    await this.codeService.send(id, code)

    return { message: 'Email send' }
  }
}
