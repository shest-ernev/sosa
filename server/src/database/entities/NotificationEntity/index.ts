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
import { CommentEntity } from '../CommentEntity'

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column()
  @ApiProperty({ enum: ['like', 'comment', 'release', 'subscriber', 'repost'] })
  type: 'like' | 'comment' | 'release' | 'subscriber' | 'repost'

  @Column({ nullable: true, name: 'user_id' })
  @ApiProperty({ nullable: true })
  userId: string

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity, nullable: true })
  user: UserEntity

  @Column({ nullable: true, name: 'profile_id' })
  @ApiProperty({ nullable: true })
  profileId: string

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'profile_id' })
  @ApiProperty({ type: UserEntity, nullable: true })
  profile: UserEntity

  @Column({ nullable: true, name: 'release_id' })
  @ApiProperty({ nullable: true })
  releaseId: string

  @ManyToOne(() => ReleaseEntity, { nullable: true })
  @JoinColumn({ name: 'release_id' })
  @ApiProperty({ type: ReleaseEntity, nullable: true })
  release: ReleaseEntity

  @Column({ nullable: true, name: 'comment_id' })
  @ApiProperty({ nullable: true })
  commentId: string

  @ManyToOne(() => CommentEntity, { nullable: true })
  @JoinColumn({ name: 'comment_id' })
  @ApiProperty({ type: CommentEntity, nullable: true })
  comment: CommentEntity

  @Column({ default: false })
  @ApiProperty()
  view: boolean

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt: Date
}
