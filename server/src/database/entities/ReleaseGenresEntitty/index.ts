import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { ReleaseEntity } from '../ReleaseEntity'
import { GenreEntity } from '../GenreEntity'

@Entity('release_genres')
export class ReleaseGenresEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column({ name: 'release_id' })
  @ApiProperty()
  releaseId: string

  @Column({ name: 'genre_id' })
  @ApiProperty()
  genreId: string

  @ManyToOne(() => ReleaseEntity)
  @JoinColumn({ name: 'release_id' })
  @ApiProperty({ type: () => ReleaseEntity })
  release: ReleaseEntity

  @ManyToOne(() => GenreEntity)
  @JoinColumn({ name: 'genre_id' })
  @ApiProperty({ type: () => GenreEntity })
  genre: GenreEntity
}
