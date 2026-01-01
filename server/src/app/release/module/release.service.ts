import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { unlink } from 'fs/promises'
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'

import { RequestWithUser } from '@/shared/types'
import {
  ReleaseEntity,
  GenreEntity,
  ReleaseGenresEntity,
} from '@/database/entities'
import { getColor } from '@/shared/lib'

import { ReleaseCreateBody, ReleaseEditBody, EditPublicBody } from '../schemas'

export class ReleaseService {
  constructor(
    @InjectRepository(ReleaseEntity)
    private readonly releasesRepository: Repository<ReleaseEntity>,
    @InjectRepository(GenreEntity)
    private readonly genresRepository: Repository<GenreEntity>,
    @InjectRepository(ReleaseGenresEntity)
    private readonly releaseGenresRepository: Repository<ReleaseGenresEntity>
  ) {}

  private async getGenres(genres?: string[]) {
    if (!genres) {
      return undefined
    }

    const collections = await this.genresRepository.find({
      where: { id: In(Array.from(new Set(genres))) },
    })

    if (genres.length !== collections.length) {
      throw new BadRequestException('A non-existent genre has been submitted')
    }

    return genres
  }

  async create(req: RequestWithUser, params: ReleaseCreateBody) {
    const { name, genres } = params

    const newrelease = this.releasesRepository.create({
      name: name.trim(),
      userId: req.user.id,
    })

    const release = await this.releasesRepository.save(newrelease)

    const genresIds = await this.getGenres(genres)

    if (genresIds) {
      const newReleaseGenres = this.releaseGenresRepository.create(
        genresIds.map((item) => ({
          releaseId: release.id,
          genreId: item,
        }))
      )

      await this.releaseGenresRepository.save(newReleaseGenres)
    }

    return { id: release.id }
  }

  async remove(req: RequestWithUser, id: string) {
    const release = await this.releasesRepository.findOne({ where: { id } })

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (release.userId !== req.user.id) {
      throw new ForbiddenException('No access')
    }

    if (release.cover) {
      await unlink(`public${release.cover}`)
    }

    await this.releaseGenresRepository.delete({ releaseId: release.id })
    await this.releasesRepository.delete({ id: release.id })

    return { message: 'Successful remove' }
  }

  async editCover(
    id: string,
    req: RequestWithUser,
    file?: Express.Multer.File
  ) {
    const user = req.user

    if (!file) {
      throw new BadRequestException('Please send file')
    }

    const release = await this.releasesRepository.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (release.userId !== user.id) {
      throw new ForbiddenException('No access')
    }

    if (release.cover) {
      await unlink(`public${release.cover}`)
    }

    const color = await getColor(`public/releases/covers/${file.filename}`)

    this.releasesRepository.update(
      { id },
      { cover: `/releases/covers/${file.filename}`, color }
    )

    return { message: 'Successful change cover' }
  }

  async editRelease(id: string, req: RequestWithUser, params: ReleaseEditBody) {
    const { name, description, genres } = params
    const user = req.user

    const release = await this.releasesRepository.findOne({
      where: { id },
    })

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (release.userId !== user.id) {
      throw new ForbiddenException('No access')
    }

    const genresIds = await this.getGenres(genres)

    if (genresIds) {
      await this.releaseGenresRepository.delete({ releaseId: release.id })

      const newReleaseGenres = this.releaseGenresRepository.create(
        genresIds.map((item) => ({
          releaseId: release.id,
          genreId: item,
        }))
      )

      await this.releaseGenresRepository.save(newReleaseGenres)
    }

    const editName = name ? name.trim() : release.name

    await this.releasesRepository.update(
      { id },
      {
        name: editName,
        description: description,
      }
    )

    return { message: 'Successful edit release' }
  }

  async getRelease(req: RequestWithUser, id: string) {
    const release = await this.releasesRepository
      .createQueryBuilder('release')
      .leftJoinAndSelect('release.genres', 'releaseGenre')
      .leftJoinAndSelect('releaseGenre.genre', 'genre')
      .leftJoinAndSelect('release.user', 'user')
      .select([
        'release.id',
        'release.name',
        'release.cover',
        'release.description',
        'release.color',
        'release.public',
        'release.date',
        'release.createdAt',
        'release.updateAt',
        'releaseGenre.id',
        'genre.id',
        'genre.name',
        'user.id',
        'user.name',
        'user.avatar',
      ])
      .where('release.id = :id', { id })
      .getOne()

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (release.user.id !== req.user.id) {
      throw new ForbiddenException('No access')
    }

    const formatRelease = {
      ...release,
      genres: release.genres.map((obj) => ({
        id: obj.genre.id,
        name: obj.genre.name,
      })),
    }

    return formatRelease
  }

  async editPublic(req: RequestWithUser, id: string, params: EditPublicBody) {
    const release = await this.releasesRepository.findOne({ where: { id } })

    if (!release) {
      throw new NotFoundException('Release not found')
    }

    if (release.userId !== req.user.id) {
      throw new ForbiddenException('No access')
    }

    await this.releasesRepository.update({ id }, { public: params.type })
  }
}
