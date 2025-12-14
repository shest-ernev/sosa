import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { UserEntity } from '../UserEntity'

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @OneToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty()
  user: UserEntity

  @Column({ default: 'dark' })
  @ApiProperty({ enum: ['dark', 'light'] })
  theme: 'dark' | 'light'

  @Column({ default: 'en' })
  @ApiProperty({ enum: ['ru', 'en'] })
  lang: 'ru' | 'en'

  @Column({ name: 'private_profile', default: false })
  @ApiProperty()
  privateProfile: boolean

  @Column({ default: false, name: 'private_followers' })
  @ApiProperty()
  privateFollowers: boolean

  @Column({ default: false, name: 'private_subs' })
  @ApiProperty()
  privateSubs: boolean

  @Column({ default: false, name: 'private_library' })
  @ApiProperty()
  privateLibrary: boolean

  @Column({ default: true, name: 'notifications_new_folowers' })
  @ApiProperty()
  notificationsNewFolowers: boolean

  @Column({ default: true, name: 'notifications_repost' })
  @ApiProperty()
  notificationsRepost: boolean

  @Column({ default: true, name: 'notifications_like' })
  @ApiProperty()
  notificationsLike: boolean

  @Column({ default: true, name: 'notifications_comment' })
  @ApiProperty()
  notificationsComment: boolean

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt?: Date
}
