import { Controller, Param, Patch, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '@/shared/guards'
import { MessageResponse } from '@/shared/schemas'
import { ApiError } from '@/shared/decorators'

import { FavoritesService } from './favorites.service'
import { RequestWithUser } from '@/shared/types'

@Controller('favorites')
@ApiTags('Favorites')
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Patch('profile/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: MessageResponse })
  @ApiError()
  async profile(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.favoritesService.profile(req, id)
  }

  @Patch('release/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: MessageResponse })
  @ApiError()
  async release(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.favoritesService.release(req, id)
  }
}
