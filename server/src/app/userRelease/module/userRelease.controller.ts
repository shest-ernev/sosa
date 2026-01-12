import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { RequestWithUser } from '@/shared/types'
import { ApiError } from '@/shared/decorators'
import { MessageResponse, UploadFileBody } from '@/shared/schemas'
import { Upload } from '@/shared/middlewares'

import {
  GetUserRelease,
  UserReleaseCreateBody,
  UserReleaseCreateData,
  UserReleaseEditBody,
} from '../schemas'

import { UserReleaseService } from './userRelease.service'

@Controller('user-release')
@ApiTags('User release')
@ApiBearerAuth()
export class UserReleaseController {
  constructor(private readonly userReleaseService: UserReleaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: UserReleaseCreateData })
  async create(
    @Req() req: RequestWithUser,
    @Body() body: UserReleaseCreateBody
  ) {
    return this.userReleaseService.create(req, body)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.userReleaseService.remove(req, id)
  }

  @Patch('cover/:id')
  @UseGuards(AuthGuard)
  @Upload({
    path: 'public/releases/covers',
    validation: /\.(png|jpeg|jpg|avif|webp)$/,
    message: 'Not valid file',
    file: '.jpg',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileBody })
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editCover(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userReleaseService.editCover(id, req, file)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async edit(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: UserReleaseEditBody
  ) {
    return this.userReleaseService.editRelease(id, req, body)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: GetUserRelease })
  async GetUserRelease(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.userReleaseService.GetUserRelease(req, id)
  }

  @Patch('public/:id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async editPublic(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.userReleaseService.editPublic(req, id)
  }
}
