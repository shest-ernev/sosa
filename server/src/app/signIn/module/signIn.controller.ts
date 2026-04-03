import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  SignInCodeBody,
  SignInCodeData,
  SignInPasswordBody,
  SignInEmailBody,
  SignInEmailData,
  SignInSendCodeBody,
  SignInPasswordData,
} from '../schemas'

import { SignInService } from './signIn.service'

@Controller('sign-in')
@ApiTags('Sign in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('email')
  @ApiResponse({ type: SignInEmailData })
  @ApiError(500, 400, 404)
  async createToken(@Body() body: SignInEmailBody) {
    return this.signInService.createToken(body)
  }

  @Post('code')
  @ApiResponse({ type: SignInCodeData })
  @ApiError(500, 400)
  async checkCode(@Body() body: SignInCodeBody) {
    return this.signInService.checkCode(body)
  }

  @Post('password')
  @ApiResponse({ type: SignInPasswordData })
  @ApiError(500, 400)
  async checkPass(@Body() body: SignInPasswordBody) {
    return this.signInService.checkPass(body)
  }

  @Post('send-code')
  @ApiResponse({ type: MessageResponse })
  @ApiError(500, 404, 400)
  async sendCode(@Body() body: SignInSendCodeBody) {
    return this.signInService.sendCode(body)
  }
}
