import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '@/database/entities'
import { CodeService } from '@/shared/services'
import { RequestWithUser } from '@/shared/types'

import {
  DeletePasswordCheckCodeBody,
  DeletePasswordSendCodeBody,
} from '../schemas'

export class DeletePasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
  ) {}

  async createToken(req: RequestWithUser) {
    await this.codeService.update(req.user.id)

    await this.codeService.send(req.user.id)

    const token = await this.jwtService.signAsync(
      { id: req.user.id },
      { expiresIn: '5m' },
    )

    return { token }
  }

  async sendCode(params: DeletePasswordSendCodeBody) {
    const { token } = params

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid token')
      })

    await this.codeService.send(id)

    return { message: 'Email send' }
  }

  async checkCode(params: DeletePasswordCheckCodeBody) {
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

    await this.usersRepository.update(
      { id: user.id },
      {
        password: '',
        code: '',
      },
    )

    return { message: 'Password deleted' }
  }
}
