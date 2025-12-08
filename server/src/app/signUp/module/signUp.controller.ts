import { Controller, Post, Body } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  SignUpCheckCodeBody,
  SignUpCheckCodeData,
  SignUpCreateTokenBody,
  SignUpCreateTokenData,
  SignUpSendCodeBody,
} from '../schemas'

import { SignUpService } from './signUp.service'

@Controller('aign-up')
@ApiTags('Sign up')
export class SignUpContorller {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('create-token')
  @ApiResponse({ type: SignUpCreateTokenData })
  @ApiError()
  async createToken(@Body() body: SignUpCreateTokenBody) {
    return this.signUpService.createToken(body)
  }

  @Post('check-code')
  @ApiResponse({ type: SignUpCheckCodeData })
  @ApiError()
  async checkCode(@Body() body: SignUpCheckCodeBody) {
    return this.signUpService.checkCode(body)
  }

  @Post('send-code')
  @ApiResponse({ type: MessageResponse })
  @ApiError()
  async sendCode(@Body() body: SignUpSendCodeBody) {
    return this.signUpService.sendCode(body)
  }
}
