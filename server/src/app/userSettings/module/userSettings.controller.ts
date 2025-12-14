import { Controller, UseGuards, Get, Req, Patch, Body } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { ApiError } from '@/shared/decorators'
import { RequestWithUser } from '@/shared/types'
import { MessageResponse } from '@/shared/schemas'

import { UserSettingsService } from './userSettings.service'
import { EditUserSettingsBody, GetUserSettingsData } from '../schemas'

@Controller('user-settings')
@ApiTags('User settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError()
  @ApiResponse({ type: GetUserSettingsData })
  async getSettings(@Req() req: RequestWithUser) {
    return this.userSettingsService.getSettings(req)
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editSettings(
    @Req() req: RequestWithUser,
    @Body() body: EditUserSettingsBody
  ) {
    return this.userSettingsService.editUserSettings(req, body)
  }
}
