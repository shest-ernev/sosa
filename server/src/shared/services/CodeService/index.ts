import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { Repository } from 'typeorm'

import { UserEntity } from '@/database/entities'
import { email } from '@/shared/api'
import { transporter } from '@/shared/config'
import { randomCode } from '@/shared/lib'

export class CodeService {
  @InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>

  async update(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const code = randomCode(6)

    await this.usersRepository.update({ id }, { code })

    return code
  }

  async compare(id: string, code: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user.code === code ? user : false
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.usersRepository.update({ id }, { code: '' })
  }

  async send(id: string, code: string) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await email
      .sendMail({
        from: transporter.user,
        to: user.email,
        subject: 'Код подтверждения',
        text: code,
      })
      .catch(() => {
        throw new InternalServerErrorException('Email Sending Error')
      })
  }
}
