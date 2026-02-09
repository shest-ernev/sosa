import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UserSettingsEntity } from '../UserSettingsEntity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column({ unique: true })
  @ApiProperty()
  email: string

  @Column({ unique: true })
  @ApiProperty()
  name: string

  @Column({ default: '' })
  @ApiProperty()
  description: string

  @Column({ default: '' })
  @ApiProperty()
  avatar: string

  @Column({ default: '' })
  @ApiProperty()
  cover: string

  @Column({
    default: '',
    name: 'refresh_token',
  })
  @ApiProperty()
  refreshToken: string

  @Column({
    default: false,
    name: 'is_active',
  })
  @ApiProperty()
  isActive: boolean

  @Column({ default: '' })
  @ApiProperty()
  code: string

  @Column({ default: 'user' })
  @ApiProperty()
  role: 'user' | 'admin' | 'moderator'

  @Column({ default: '' })
  @ApiProperty()
  password: string

  @Column({ name: 'settings_id', nullable: true, default: null })
  @ApiProperty({ nullable: true })
  settingsId: string | null

  @OneToOne(() => UserSettingsEntity, { nullable: true })
  @JoinColumn({ name: 'settings_id' })
  @ApiProperty({ type: UserSettingsEntity, nullable: true })
  settings: UserSettingsEntity

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt: Date
}
