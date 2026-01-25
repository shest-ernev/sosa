import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  SignInCheckCodeBody,
  SignInCheckCodeData,
  SignInCreateTokenBody,
  SignInCreateTokenData,
  SignInSendCodeBody,
} from '../schemas'

import { SignInService } from './signIn.service'

@Controller('sign-in')
@ApiTags('Sign in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('create-token')
  @ApiResponse({ type: SignInCreateTokenData })
  @ApiError(500, 400, 404)
  async createToken(@Body() body: SignInCreateTokenBody) {
    return this.signInService.createToken(body)
  }

  @Post('check-code')
  @ApiResponse({ type: SignInCheckCodeData })
  @ApiError(500, 400)
  async checkCode(@Body() body: SignInCheckCodeBody) {
    return this.signInService.checkCode(body)
  }

  @Post('send-code')
  @ApiResponse({ type: MessageResponse })
  @ApiError(500, 404, 400)
  async sendCode(@Body() body: SignInSendCodeBody) {
    return this.signInService.sendCode(body)
  }
}
