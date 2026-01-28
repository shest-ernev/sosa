import { InjectRepository } from '@nestjs/typeorm'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { ILike, Repository } from 'typeorm'
import { unlink } from 'fs/promises'

import { UserEntity } from '@/database/entities'
import { RequestWithUser } from '@/shared/types'

import { UserEditDescriptionBody, UserEditNameBody } from '../schemas'

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUser(req: RequestWithUser) {
    const { name, avatar, cover, role } = req.user

    return { name, avatar, cover, role }
  }

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

  async editDescription(params: UserEditDescriptionBody, req: RequestWithUser) {
    const description = params.description

    await this.usersRepository.update({ id: req.user.id }, { description })

    return { message: 'Description changed' }
  }

  async editAvatar(req: RequestWithUser, file?: Express.Multer.File) {
    const user = req.user

    if (!file) {
      throw new BadRequestException('Please send file')
    }

    if (user.avatar) {
      await unlink(`public${user.avatar}`)
    }

    this.usersRepository.update(
      { id: user.id },
      { avatar: `/users/avatars/${file.filename}` },
    )

    return { message: 'Successful change avatar' }
  }

  async deleteAvatar(req: RequestWithUser) {
    const user = req.user

    if (!user.avatar) {
      throw new BadRequestException(`User havn't avatar`)
    }

    unlink(`public${user.avatar}`)

    this.usersRepository.update({ id: user.id }, { avatar: '' })

    return { message: 'Successful delete avatar' }
  }

  async editCover(req: RequestWithUser, file?: Express.Multer.File) {
    const user = req.user

    if (!file) {
      throw new BadRequestException('Please send file')
    }

    if (user.cover) {
      await unlink(`public${user.cover}`)
    }

    this.usersRepository.update(
      { id: user.id },
      { cover: `/users/covers/${file.filename}` },
    )

    return { message: 'Successful change cover' }
  }

  async deleteCover(req: RequestWithUser) {
    const user = req.user

    if (!user.cover) {
      throw new BadRequestException(`User havn't cover`)
    }

    await unlink(`public${user.cover}`)

    this.usersRepository.update({ id: user.id }, { cover: '' })

    return { message: 'Successful delete cover' }
  }
}
