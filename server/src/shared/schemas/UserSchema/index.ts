import { PickType } from '@nestjs/swagger'

import { UserEntity } from '@/database/entities'

export class UserSchema extends PickType(UserEntity, [
  'id',
  'email',
  'name',
  'avatar',
  'cover',
  'description',
  'role',
  'createdAt',
  'updateAt',
]) {}
