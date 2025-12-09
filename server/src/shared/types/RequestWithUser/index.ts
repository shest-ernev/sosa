import { Request } from 'express'

import { UserEntity } from '@/database/entities'

export type RequestWithUser = Request & {
  user: Pick<
    UserEntity,
    | 'id'
    | 'name'
    | 'email'
    | 'avatar'
    | 'cover'
    | 'role'
    | 'createdAt'
    | 'updateAt'
  >
}
