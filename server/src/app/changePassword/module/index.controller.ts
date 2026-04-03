import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Patch, Post } from '@nestjs/common'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  ChangePasswordCheckCodeBody,
  ChangePasswordCheckCodeData,
  ChangePasswordEmailBody,
  ChangePasswordEmailData,
  ChangePasswordNewBody,
  ChangePasswordSendCodeBody,
} from '../schemas'

import { ChangePasswordService } from './index.service'

@Controller('change-password')
@ApiTags('Change password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post('email')
  @ApiError(500, 404, 400)
  @ApiResponse({ type: ChangePasswordEmailData })
  async email(@Body() body: ChangePasswordEmailBody) {
    return this.changePasswordService.email(body)
  }

  @Post('code')
  @ApiError(500, 404, 400)
  @ApiResponse({ type: ChangePasswordCheckCodeData })
  async code(@Body() body: ChangePasswordCheckCodeBody) {
    return this.changePasswordService.checkCode(body)
  }

  @Patch('password')
  @ApiError(500, 404, 400)
  @ApiResponse({ type: MessageResponse })
  async password(@Body() body: ChangePasswordNewBody) {
    return this.changePasswordService.newPass(body)
  }

  @Post('send-code')
  @ApiError(500, 404, 400)
  @ApiResponse({ type: MessageResponse })
  async sendCode(@Body() body: ChangePasswordSendCodeBody) {
    return this.changePasswordService.sendCode(body)
  }
}
