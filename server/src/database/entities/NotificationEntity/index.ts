import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { UserEntity } from '../UserEntity'
import { ReleaseEntity } from '../ReleaseEntity'

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id!: string

  @Column()
  @ApiProperty({ enum: ['newRelease', 'subscriber', 'like'] })
  type!: 'newRelease' | 'subscriber' | 'like'

  @Column({ nullable: true, name: 'user_id' })
  @ApiProperty({ nullable: true })
  userId!: string

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity, nullable: true })
  user!: UserEntity

  @Column({ nullable: true, name: 'profile_id', default: null })
  @ApiProperty({ nullable: true })
  profileId!: string

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'profile_id' })
  @ApiProperty({ type: UserEntity, nullable: true })
  profile!: UserEntity

  @Column({ nullable: true, name: 'release_id', default: null })
  @ApiProperty({ nullable: true })
  releaseId!: string

  @ManyToOne(() => ReleaseEntity, { nullable: true })
  @JoinColumn({ name: 'release_id' })
  @ApiProperty({ type: ReleaseEntity, nullable: true })
  release!: ReleaseEntity

  @Column({ default: false })
  @ApiProperty()
  view!: boolean

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt!: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt!: Date
}
