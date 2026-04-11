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

import { ReleaseEntity } from '../ReleaseEntity'
import { UserEntity } from '../UserEntity'

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id!: string

  @Column()
  @ApiProperty()
  text!: string

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId!: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: UserEntity })
  user!: UserEntity

  @Column({ name: 'release_id' })
  @ApiProperty()
  releaseId!: string

  @ManyToOne(() => ReleaseEntity)
  @JoinColumn({ name: 'release_id' })
  @ApiProperty()
  release!: ReleaseEntity

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt!: Date

  @UpdateDateColumn({ name: 'update_at' })
  @ApiProperty()
  updateAt!: Date
}
