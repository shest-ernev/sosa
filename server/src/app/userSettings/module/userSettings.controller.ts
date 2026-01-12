import { Controller, UseGuards, Req, Patch, Body, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { ApiError } from '@/shared/decorators'
import { RequestWithUser } from '@/shared/types'
import { MessageResponse } from '@/shared/schemas'

import { UserSettingsService } from './userSettings.service'
import { EditUserSettingsBody, GetUserSettings } from '../schemas'

@Controller('user-settings')
@ApiTags('User settings')
@ApiBearerAuth()
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Patch()
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editSettings(
    @Req() req: RequestWithUser,
    @Body() body: EditUserSettingsBody
  ) {
    return this.userSettingsService.editUserSettings(req, body)
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: GetUserSettings })
  async getSettings(@Req() req: RequestWithUser) {
    return this.userSettingsService.getSettings(req)
  }
}
