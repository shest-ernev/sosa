import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { UserEntity } from '../UserEntity'

@Entity('user_subs')
@Unique(['userId', 'subscriberId'])
export class UserSubsEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @Column({ name: 'subscriber_id' })
  @ApiProperty()
  subscriberId: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'subscriber_id' })
  @ApiProperty({ type: UserEntity })
  subscriber: UserEntity

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt?: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt?: Date
}
