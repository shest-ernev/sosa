import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'

import { UserEntity } from '../UserEntity'
import { ReleaseEntity } from '../ReleaseEntity'

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @ApiProperty({ enum: ['profile'] })
  type: 'profile' | 'release'

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @Column({ name: 'profile_id' })
  @ApiProperty()
  profileId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'profile_id' })
  @ApiProperty({ type: UserEntity })
  profile: UserEntity

  @Column({ name: 'release_id' })
  @ApiProperty()
  releaseId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'release_id' })
  @ApiProperty({ type: ReleaseEntity })
  release: ReleaseEntity

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date
}
