import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { UserEntity } from '@/database/entities'
import { CodeService } from '@/shared/services'

import {
  ChangeEmailCheckCodeBody,
  ChangeEmailEmailBody,
  ChangeEmailNewEmailBody,
  ChangeEmailSendCodeBody,
} from '../schemas'

export class ChangeEmailService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
  ) {}

  async email(params: ChangeEmailEmailBody) {
    const { email } = params

    const user = await this.usersRepository.findOne({
      where: { email: ILike(email) },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.codeService.update(user.id)
    await this.codeService.send(user.id)

    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '5m' },
    )

    return { token }
  }

  async sendCode(params: ChangeEmailSendCodeBody) {
    const { token } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    await this.codeService.send(id)

    return { message: 'Email send' }
  }

  async checkCode(params: ChangeEmailCheckCodeBody) {
    const { token, code } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new BadRequestException('Wrong code')
    }

    const newToken = await this.jwtService.signAsync(
      { id, code },
      { expiresIn: '5m' },
    )

    return { token: newToken }
  }

  async newEmail(params: ChangeEmailNewEmailBody) {
    const { token, email } = params

    const { id, code } = await this.jwtService
      .verifyAsync<{ id: string; code: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    const user = await this.codeService.compare(id, code)

    if (!user) {
      throw new BadRequestException('Wrong code')
    }

    const compareEmail = email.toLowerCase() === user.email.toLowerCase()

    if (!compareEmail) {
      const conflictUser = await this.usersRepository.findOne({
        where: { email: ILike(email) },
      })

      if (conflictUser) {
        throw new ConflictException('There is already a user with this email')
      }
    }

    await this.usersRepository.update(
      { id: user.id },
      {
        email,
        code: '',
      },
    )

    return { message: 'Email changed' }
  }
}
