import { Body, Controller, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  ChangeEmailCheckCodeBody,
  ChangeEmailCheckCodeData,
  ChangeEmailEmailBody,
  ChangeEmailEmailData,
  ChangeEmailNewEmailBody,
  ChangeEmailSendCodeBody,
} from '../schemas'

import { ChangeEmailService } from './index.service'

@Controller('change-email')
@ApiTags('Change email')
export class ChangeEmailController {
  constructor(private readonly changeEmailService: ChangeEmailService) {}

  @Post('email')
  @ApiError(500, 404, 400)
  @ApiResponse({ type: ChangeEmailEmailData })
  async email(@Body() body: ChangeEmailEmailBody) {
    return this.changeEmailService.email(body)
  }

  @Post('send-code')
  @ApiError(500, 404, 401, 400)
  @ApiResponse({ type: MessageResponse })
  async sendCode(@Body() body: ChangeEmailSendCodeBody) {
    return this.changeEmailService.sendCode(body)
  }

  @Post('code')
  @ApiError(500, 404, 401, 400)
  @ApiResponse({ type: ChangeEmailCheckCodeData })
  async code(@Body() body: ChangeEmailCheckCodeBody) {
    return this.changeEmailService.checkCode(body)
  }

  @Patch('new-email')
  @ApiError(500, 404, 401, 400, 409)
  @ApiResponse({ type: MessageResponse })
  async newEmail(@Body() body: ChangeEmailNewEmailBody) {
    return this.changeEmailService.newEmail(body)
  }
}
