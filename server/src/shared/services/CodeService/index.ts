import { InjectRepository } from '@nestjs/typeorm'
import {
  NotFoundException,
  //InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '@/database/entities'
//import { email } from '@/shared/api'
//import { transporter } from '@/shared/config'
import { randomCode } from '@/shared/lib'

import { UserJwtCode } from './types'

export class CodeService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async update(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const code = await this.jwtService.signAsync(
      { code: randomCode(6) },
      { expiresIn: '5m' },
    )

    await this.usersRepository.update({ id }, { code })

    return code
  }

  async compare(id: string, code: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const { code: userCode } = await this.jwtService
      .verifyAsync<UserJwtCode>(user.code)
      .catch(() => {
        throw new UnauthorizedException('Invalid code')
      })

    return userCode === code ? user : false
  }

  async send(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const { code } = await this.jwtService
      .verifyAsync<UserJwtCode>(user.code)
      .catch(() => {
        throw new UnauthorizedException('Invalid code')
      })

    return code

    //await email
    //  .sendMail({
    //    from: transporter.user,
    //    to: user.email,
    //    subject: 'Код подтверждения',
    //    text: code,
    //  })
    //  .catch((err) => {
    //    throw new InternalServerErrorException(`Email Sending Error ${err}`)
    //  })
  }
}
