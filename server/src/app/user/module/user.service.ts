import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, ConflictException, Logger } from '@nestjs/common'
import { ILike, Repository } from 'typeorm'
import { unlink } from 'fs'

import { UserEntity } from '@/database/entities'
import { RequestWithUser } from '@/shared/types'

import { UserEditNameBody } from '../schemas'

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly logger: Logger
  ) {}

  async editName(params: UserEditNameBody, req: RequestWithUser) {
    const name = params.name.trim()
    const userName = req.user.name

    const compareName = name.toLowerCase() === userName.toLowerCase()

    if (compareName) {
      await this.usersRepository.update({ id: req.user.id }, { name })

      return { message: 'Name changed' }
    }

    const conflictUser = await this.usersRepository.findOne({
      where: { name: ILike(name) },
    })

    if (conflictUser) {
      throw new ConflictException('There is already a user with this name')
    }

    await this.usersRepository.update({ id: req.user.id }, { name })

    return { message: 'Name changed' }
  }

  async editAvatar(req: RequestWithUser, file?: Express.Multer.File) {
    const user = req.user

    if (!file) {
      throw new BadRequestException('Please send file')
    }

    if (user.avatar) {
      unlink(`public${user.avatar}`, (err) => {
        this.logger.log(`Error to delete avatar ${user.id}`, err)
      })
    }

    this.usersRepository.update(
      { id: user.id },
      { avatar: `/users/avatars/${file.filename}` }
    )

    return { message: 'Successful change avatar' }
  }

  async deleteAvatar(req: RequestWithUser) {
    const user = req.user

    if (!user.avatar) {
      throw new BadRequestException(`User havn't avatar`)
    }

    unlink(`public${user.avatar}`, (err) => {
      this.logger.log(`Error delete avatar ${user.id}`, err)
    })

    this.usersRepository.update({ id: user.id }, { avatar: '' })

    return { message: 'Successful delete avatar' }
  }

  async editCover(req: RequestWithUser, file?: Express.Multer.File) {
    const user = req.user

    if (!file) {
      throw new BadRequestException('Please send file')
    }

    if (user.cover) {
      unlink(`public${user.cover}`, (err) => {
        this.logger.log(`Error to delete cover ${user.id}`, err)
      })
    }

    this.usersRepository.update(
      { id: user.id },
      { cover: `/users/covers/${file.filename}` }
    )

    return { message: 'Successful change cover' }
  }

  async deleteCover(req: RequestWithUser) {
    const user = req.user

    if (!user.cover) {
      throw new BadRequestException(`User havn't cover`)
    }

    unlink(`public${user.cover}`, (err) => {
      this.logger.log(`Error delete cover ${user.id}`, err)
    })

    this.usersRepository.update({ id: user.id }, { cover: '' })

    return { message: 'Successful delete cover' }
  }
}
