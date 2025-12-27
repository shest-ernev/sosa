import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { UserEntity } from '../UserEntity'
import { GenreEntity } from '../GenreEntity'

@Entity('releases')
export class ReleaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  name: string

  @Column({ default: '', nullable: true })
  @ApiProperty({ nullable: true })
  description: string

  @Column({ default: '' })
  @ApiProperty()
  color: string

  @Column({ default: false })
  @ApiProperty()
  public: boolean

  @Column()
  @ApiProperty()
  date: Date

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @ManyToMany(() => GenreEntity)
  @JoinTable({
    name: 'release_genres',
    joinColumn: {
      name: 'release_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ type: [GenreEntity] })
  genres: GenreEntity[]

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt: Date
}
