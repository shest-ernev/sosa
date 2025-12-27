import {
  Controller,
  UseGuards,
  Req,
  Patch,
  Body,
  UploadedFile,
  Delete,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { ApiError } from '@/shared/decorators'
import { MessageResponse, UploadFileBody } from '@/shared/schemas'
import { RequestWithUser } from '@/shared/types'
import { Upload } from '@/shared/middlewares'

import { UserEditDescriptionBody, UserEditNameBody } from '../schemas'

import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('name')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editName(@Body() body: UserEditNameBody, @Req() req: RequestWithUser) {
    return this.userService.editName(body, req)
  }

  @Patch('description')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editDescription(
    @Body() body: UserEditDescriptionBody,
    @Req() req: RequestWithUser
  ) {
    return this.userService.editDescription(body, req)
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @Upload({
    path: 'public/users/avatars',
    validation: /\.(png|jpeg|jpg|avif)$/,
    message: 'Not valid file',
  })
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileBody })
  async editAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser
  ) {
    return this.userService.editAvatar(req, file)
  }

  @Delete('avatar')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async deleteAvatar(@Req() req: RequestWithUser) {
    return this.userService.deleteAvatar(req)
  }

  @Patch('cover')
  @UseGuards(AuthGuard)
  @Upload({
    path: 'public/users/covers',
    validation: /\.(png|jpeg|jpg|avif)$/,
    message: 'Not valid file',
  })
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileBody })
  async editCover(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser
  ) {
    return this.userService.editCover(req, file)
  }

  @Delete('cover')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async deleteCover(@Req() req: RequestWithUser) {
    return this.userService.deleteCover(req)
  }
}
