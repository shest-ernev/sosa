import { InjectRepository } from '@nestjs/typeorm'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'

import { RequestWithUser } from '@/shared/types'
import {
  NotificationEntity,
  UserSubsEntity,
  UserEntity,
} from '@/database/entities'

import { UserSubSubscribeBody, UserSubUnsubscribeBody } from '../schemas'

export class UserSubsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
    @InjectRepository(UserSubsEntity)
    private readonly usersSubsRepository: Repository<UserSubsEntity>
  ) {}

  async subscribe(req: RequestWithUser, params: UserSubSubscribeBody) {
    const subscriber = req.user
    const userId = params.profile

    const user = await this.usersRepository.findOne({
      relations: ['settings'],
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const conflictSub = await this.usersSubsRepository.findOne({
      where: { userId: user.id, subscriberId: subscriber.id },
    })

    if (conflictSub) {
      throw new ConflictException('Subscription already available')
    }

    const newSub = this.usersSubsRepository.create({
      userId: user.id,
      subscriberId: subscriber.id,
    })

    await this.usersSubsRepository.save(newSub)

    if (user.settings.notificationsNewSubscriber) {
      const newNotofocation = this.notificationsRepository.create({
        userId: user.id,
        type: 'subscriber',
        profileId: subscriber.id,
      })

      await this.notificationsRepository.save(newNotofocation)
    }

    return {
      message: 'You have subscribed',
    }
  }

  async unsubscribing(req: RequestWithUser, params: UserSubUnsubscribeBody) {
    const subscriber = req.user
    const userId = params.profile

    const sub = await this.usersSubsRepository.findOne({
      where: { userId, subscriberId: subscriber.id },
    })

    if (!sub) {
      throw new NotFoundException('There is no subscription anyway')
    }

    await this.usersSubsRepository.delete({ id: sub.id })

    return { message: 'You unsubscribed' }
  }
}
