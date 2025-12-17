import { UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

import { RequestWithUser } from '@/shared/types'
import { UserSettingsEntity, UserEntity } from '@/database/entities'

export class AuthService {
  constructor(
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsRepository: Repository<UserSettingsEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async getAuth(req: RequestWithUser) {
    const user = req.user

    return user
  }

  async logOut(req: RequestWithUser) {
    const { id } = req.user

    await this.usersRepository.update({ id }, { refreshToken: '' })

    return { message: 'Successful log out' }
  }

  async refresh(token: string) {
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const { id } = await this.jwtService
      .verifyAsync<{ id: string }>(token)
      .catch(() => {
        throw new UnauthorizedException('Invalid refresh token')
      })

    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const { id: userId } = await this.jwtService
      .verifyAsync<{ id: string }>(user.refreshToken)
      .catch(async () => {
        throw new UnauthorizedException('Invalid refresh token')
      })

    if (id !== userId) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '5m' }
    )

    return { access_token: accessToken }
  }
}
