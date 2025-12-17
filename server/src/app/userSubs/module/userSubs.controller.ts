import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import { UserSubSubscribeBody, UserSubUnsubscribeBody } from '../schemas'

import { UserSubsService } from './userSubs.service'
import { RequestWithUser } from '@/shared/types'

@Controller('user-subs')
@ApiTags('User subs')
export class UserSubsController {
  constructor(private readonly userSubsService: UserSubsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async subscribe(
    @Body() body: UserSubSubscribeBody,
    @Req() req: RequestWithUser
  ) {
    return this.userSubsService.subscribe(req, body)
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async unsubscribing(
    @Body() body: UserSubUnsubscribeBody,
    @Req() req: RequestWithUser
  ) {
    return this.userSubsService.unsubscribing(req, body)
  }
}
