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
  GetRelease,
  ReleaseCreateBody,
  ReleaseCreateData,
  ReleaseEditBody,
} from '../schemas'

import { ReleaseService } from './release.service'

@Controller('release')
@ApiTags('Release')
@ApiBearerAuth()
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: ReleaseCreateData })
  async create(@Req() req: RequestWithUser, @Body() body: ReleaseCreateBody) {
    return this.releaseService.create(req, body)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.releaseService.remove(req, id)
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
    return this.releaseService.editCover(id, req, file)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: MessageResponse })
  async edit(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: ReleaseEditBody
  ) {
    return this.releaseService.editRelease(id, req, body)
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiError()
  @ApiResponse({ type: GetRelease })
  async getRelease(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.releaseService.getRelease(req, id)
  }
}
