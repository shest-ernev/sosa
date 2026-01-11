import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'

import {
  FavoritesEntity,
  NotificationEntity,
  UserEntity,
  ReleaseEntity,
} from '@/database/entities'
import { RequestWithUser } from '@/shared/types'

export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(ReleaseEntity)
    private readonly releasesRepository: Repository<ReleaseEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>
  ) {}

  async profile(req: RequestWithUser, id: string) {
    const profile = await this.usersRepository.findOne({
      where: { id },
      relations: ['settings'],
    })

    if (id === req.user.id) {
      throw new ConflictException(`You can't subscribe to yourself`)
    }

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    const favorite = await this.favoritesRepository.findOne({
      where: { type: 'profile', profileId: id, userId: req.user.id },
    })

    if (!favorite) {
      const newFavorite = this.favoritesRepository.create({
        type: 'profile',
        profileId: profile.id,
        userId: req.user.id,
      })

      await this.favoritesRepository.save(newFavorite)

      if (profile.settings.notificationsNewSubscriber) {
        const newNotification = this.notificationsRepository.create({
          userId: profile.id,
          type: 'subscriber',
          profileId: req.user.id,
        })

        await this.notificationsRepository.save(newNotification)
      }

      return { message: 'You have subscribed' }
    }

    await this.favoritesRepository.delete({ id: favorite.id })

    return { message: 'You unsubscribed' }
  }

  async release(req: RequestWithUser, id: string) {
    const release = await this.releasesRepository
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.user', 'user')
      .leftJoinAndSelect('user.settings', 'settings')
      .where('release.id = :id', { id })
      .getOne()

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (!release.public) {
      throw new ForbiddenException(
        `You can't add a non-public release to your favourites`
      )
    }

    const favorite = await this.favoritesRepository.findOne({
      where: { type: 'release', releaseId: release.id, userId: req.user.id },
    })

    if (!favorite) {
      const newFavorite = this.favoritesRepository.create({
        userId: req.user.id,
        type: 'release',
        releaseId: release.id,
      })

      await this.favoritesRepository.save(newFavorite)

      if (release.user.settings.notificationsLike) {
        const newNotification = this.notificationsRepository.create({
          userId: release.userId,
          type: 'like',
          releaseId: release.id,
          profileId: req.user.id,
        })

        await this.notificationsRepository.save(newNotification)
      }

      return { message: `You've liked` }
    }

    await this.favoritesRepository.delete({ id: favorite.id })

    return { message: 'You removed the like' }
  }
}
