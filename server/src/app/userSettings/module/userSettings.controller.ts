import { Controller, UseGuards, Req, Patch, Body } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { ApiError } from '@/shared/decorators'
import { RequestWithUser } from '@/shared/types'
import { MessageResponse } from '@/shared/schemas'

import { UserSettingsService } from './userSettings.service'
import { EditUserSettingsBody } from '../schemas'

@Controller('user-settings')
@ApiTags('User settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

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
