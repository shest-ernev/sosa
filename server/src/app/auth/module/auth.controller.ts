import { Controller, Get, UseGuards, Req, Param, Patch } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { AuthGuard } from '@/shared/guards'
import { RequestWithUser } from '@/shared/types'
import { MessageResponse, UserSchema } from '@/shared/schemas'

import { AuthRefreshData } from '../schemas'

import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError(500, 401)
  @ApiResponse({ type: UserSchema })
  async getAuth(@Req() req: RequestWithUser) {
    return this.authService.getAuth(req)
  }

  @Get('refresh/:token')
  @ApiError(500, 401)
  @ApiResponse({ type: AuthRefreshData })
  async refresh(@Param('token') token: string) {
    return this.authService.refresh(token)
  }

  @Patch('log-out')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError(401)
  @ApiResponse({ type: MessageResponse })
  async logOut(@Req() req: RequestWithUser) {
    return this.authService.logOut(req)
  }
}
