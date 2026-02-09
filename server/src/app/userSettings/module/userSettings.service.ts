import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

import { UserSettingsEntity } from '@/database/entities'
import { RequestWithUser } from '@/shared/types'

import { EditUserSettingsBody } from '../schemas'

export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsRepository: Repository<UserSettingsEntity>,
  ) {}

  async editUserSettings(req: RequestWithUser, params: EditUserSettingsBody) {
    const settings = await this.userSettingsRepository.findOne({
      where: { id: req.user.settings.id },
    })

    if (!settings) {
      throw new NotFoundException('User settings not found')
    }

    await this.userSettingsRepository.update({ id: settings.id }, params)

    return { message: 'Successful edit settings' }
  }

  async getSettings(req: RequestWithUser) {
    const settings = await this.userSettingsRepository.findOne({
      where: { id: req.user.settings.id },
    })

    if (!settings) {
      throw new NotFoundException('Settings not found')
    }

    return {
      ...settings,
      password: !!req.user.password,
    }
  }
}
