import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

import { UserSettingsEntity } from '@/database/entities'
import { RequestWithUser } from '@/shared/types'

import { EditUserSettingsBody } from '../schemas'

export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsRepository: Repository<UserSettingsEntity>
  ) {}

  async getSettings(req: RequestWithUser) {
    const settings = await this.userSettingsRepository.findOne({
      where: { userId: req.user.id },
      select: [
        'id',
        'createdAt',
        'notificationsComment',
        'notificationsLike',
        'notificationsNewFolowers',
        'notificationsRepost',
        'privateFollowers',
        'privateLibrary',
        'privateSubs',
        'theme',
        'lang',
        'updateAt',
      ],
    })

    if (!settings) {
      throw new NotFoundException('User settings not found')
    }

    return settings
  }

  async editUserSettings(
    req: RequestWithUser,
    params: EditUserSettingsBody
  ) {
    const settings = await this.userSettingsRepository.findOne({
      where: { userId: req.user.id },
    })

    if (!settings) {
      throw new NotFoundException('User settings not found')
    }

    await this.userSettingsRepository.update({ id: settings.id }, params)

    return { message: 'Successful edit settings' }
  }
}
