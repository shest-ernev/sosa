import { Controller, Post, Body } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { MessageResponse } from '@/shared/schemas'

import {
  SignUpCodeBody,
  SignUpCodeData,
  SignUpDataBody,
  SignUpDataData,
  SignUpSendCodeBody,
} from '../schemas'

import { SignUpService } from './signUp.service'

@Controller('sign-up')
@ApiTags('Sign up')
export class SignUpContorller {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('data')
  @ApiResponse({ type: SignUpDataData })
  @ApiError(500, 409, 404, 400)
  async createToken(@Body() body: SignUpDataBody) {
    return this.signUpService.createToken(body)
  }

  @Post('code')
  @ApiResponse({ type: SignUpCodeData })
  @ApiError(500, 400, 404)
  async checkCode(@Body() body: SignUpCodeBody) {
    return this.signUpService.checkCode(body)
  }

  @Post('send-code')
  @ApiResponse({ type: MessageResponse })
  @ApiError(500, 404, 400)
  async sendCode(@Body() body: SignUpSendCodeBody) {
    return this.signUpService.sendCode(body)
  }
}
