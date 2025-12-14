import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

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

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt: Date
}
