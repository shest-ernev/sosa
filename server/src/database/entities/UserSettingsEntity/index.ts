import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column({ default: 'dark' })
  @ApiProperty({ enum: ['dark', 'light'] })
  theme: 'dark' | 'light'

  @Column({ default: 'en' })
  @ApiProperty({ enum: ['ru', 'en'] })
  lang: 'ru' | 'en'

  @Column({ name: 'private_profile', default: false })
  @ApiProperty()
  privateProfile: boolean

  @Column({ default: false, name: 'private_subscribers' })
  @ApiProperty()
  privateSubscribers: boolean

  @Column({ default: false, name: 'private_library' })
  @ApiProperty()
  privateLibrary: boolean

  @Column({ default: true, name: 'notifications_new_subscriber' })
  @ApiProperty()
  notificationsNewSubscriber: boolean

  @Column({ default: true, name: 'notifications_repost' })
  @ApiProperty()
  notificationsRepost: boolean

  @Column({ default: true, name: 'notifications_like' })
  @ApiProperty()
  notificationsLike: boolean

  @Column({ default: true, name: 'notifications_comment' })
  @ApiProperty()
  notificationsComment: boolean

  @Column({ default: true, name: 'notifications_new_release' })
  @ApiProperty()
  notificationsNewRelease: boolean

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt?: Date
}
