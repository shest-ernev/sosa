import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApiError } from '@/shared/decorators'
import { AuthGuard } from '@/shared/guards'
import { MessageResponse } from '@/shared/schemas'
import { RequestWithUser } from '@/shared/types'

import {
  DeletePasswordCheckCodeBody,
  DeletePasswordCreateData,
  DeletePasswordSendCodeBody,
} from '../schemas'

import { DeletePasswordService } from './index.service'

@Controller('delete-password')
@ApiTags('Delete password')
@ApiBearerAuth()
export class DeletePasswordController {
  constructor(private readonly deletePasswordService: DeletePasswordService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiError(500, 401)
  @ApiResponse({ type: DeletePasswordCreateData })
  async createToken(@Req() req: RequestWithUser) {
    return this.deletePasswordService.createToken(req)
  }

  @Post('send-code')
  @ApiError(500, 401, 404, 400)
  @ApiResponse({ type: MessageResponse })
  async sendCode(@Body() body: DeletePasswordSendCodeBody) {
    return this.deletePasswordService.sendCode(body)
  }

  @Post('code')
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  async checkCode(@Body() body: DeletePasswordCheckCodeBody) {
    return this.deletePasswordService.checkCode(body)
  }
}
