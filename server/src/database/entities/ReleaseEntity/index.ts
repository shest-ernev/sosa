import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { UserEntity } from '../UserEntity'
import { ReleaseGenresEntity } from '../ReleaseGenresEntitty'

@Entity('releases')
export class ReleaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty()
  name: string

  @Column({ default: '' })
  @ApiProperty()
  cover: string

  @Column({ default: '' })
  @ApiProperty()
  description: string

  @Column({ default: '' })
  @ApiProperty()
  color: string

  @Column({ default: false })
  @ApiProperty()
  public: boolean

  @Column({ nullable: true })
  @ApiProperty()
  date: Date

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @OneToMany(() => ReleaseGenresEntity, (entity) => entity.release)
  @ApiProperty({ type: () => [ReleaseGenresEntity] })
  genres: ReleaseGenresEntity[]

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt: Date
}
