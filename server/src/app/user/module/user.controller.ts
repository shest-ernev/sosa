import {
  Controller,
  UseGuards,
  Req,
  Patch,
  Body,
  UploadedFile,
  Delete,
  Get,
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

import {
  GetUserData,
  UserEditDescriptionBody,
  UserEditNameBody,
} from '../schemas'

import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiError(401, 500)
  @ApiResponse({ type: GetUserData })
  async getUser(@Req() req: RequestWithUser) {
    return this.userService.getUser(req)
  }

  @Patch('name')
  @UseGuards(AuthGuard)
  @ApiError(401, 400, 409, 500)
  @ApiResponse({ type: MessageResponse })
  async editName(@Body() body: UserEditNameBody, @Req() req: RequestWithUser) {
    return this.userService.editName(body, req)
  }

  @Patch('description')
  @UseGuards(AuthGuard)
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  async editDescription(
    @Body() body: UserEditDescriptionBody,
    @Req() req: RequestWithUser,
  ) {
    return this.userService.editDescription(body, req)
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @Upload({
    path: 'public/users/avatars',
    validation: /\.(png|jpeg|jpg|avif|webp)$/,
    message: 'Not valid file',
    file: '.jpg',
  })
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileBody })
  async editAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.userService.editAvatar(req, file)
  }

  @Delete('avatar')
  @UseGuards(AuthGuard)
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  async deleteAvatar(@Req() req: RequestWithUser) {
    return this.userService.deleteAvatar(req)
  }

  @Patch('cover')
  @UseGuards(AuthGuard)
  @Upload({
    path: 'public/users/covers',
    validation: /\.(png|jpeg|jpg|avif|webp)$/,
    message: 'Not valid file',
    file: '.jpg',
  })
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileBody })
  async editCover(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    return this.userService.editCover(req, file)
  }

  @Delete('cover')
  @UseGuards(AuthGuard)
  @ApiError(500, 401, 400)
  @ApiResponse({ type: MessageResponse })
  async deleteCover(@Req() req: RequestWithUser) {
    return this.userService.deleteCover(req)
  }
}
