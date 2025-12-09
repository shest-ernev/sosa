import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '@/database/entities'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request & { user: UserEntity }>()

    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new UnauthorizedException('Invalid access token')
    }

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid access token')
      })

    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'name',
        'avatar',
        'cover',
        'role',
        'createdAt',
        'updateAt',
      ],
    })

    if (!user) {
      throw new UnauthorizedException('Invalid access token')
    }

    req.user = user

    return true
  }
}
