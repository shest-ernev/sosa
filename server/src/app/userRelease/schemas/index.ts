import { ApiProperty, PickType } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { GenreEntity, ReleaseEntity, UserEntity } from '@/database/entities'

export class UserReleaseCreateBody {
  @IsString({ message: 'Please enter string for name' })
  @MaxLength(200, { message: 'Maximum 200 characters for name album' })
  @MinLength(1, { message: 'Minimum 1 character for name album' })
  @ApiProperty()
  name!: string

  @IsArray()
  @IsOptional()
  @ArrayMinSize(0)
  @ArrayMaxSize(3, { message: 'Maximum 3 genres' })
  @ApiProperty({ type: [String], required: false })
  genres?: string[]
}

export class UserReleaseCreateData {
  @ApiProperty()
  id!: string
}

export class UserReleaseEditBody {
  @IsOptional()
  @IsString({ message: 'Please enter string for name' })
  @MaxLength(200, { message: 'Maximum 200 characters for name album' })
  @MinLength(1, { message: 'Minimum 1 character for name album' })
  @ApiProperty({ required: false })
  name?: string

  @IsOptional()
  @IsString({ message: 'Please enter string for description' })
  @MinLength(1, { message: 'Minimum 1 character for name album' })
  @MaxLength(700, { message: 'Maximum 700 characters for description album' })
  @ApiProperty({ required: false })
  description?: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(3, { message: 'Maximum 3 genres' })
  @ApiProperty({ type: [String], required: false })
  genres?: string[]
}

class ReleaseUser extends PickType(UserEntity, ['id', 'name', 'avatar']) {}

class ReleaseGenre extends PickType(GenreEntity, ['id', 'name']) {}

export class GetUserRelease extends PickType(ReleaseEntity, [
  'id',
  'name',
  'cover',
  'description',
  'color',
  'public',
  'date',
  'createdAt',
  'updateAt',
]) {
  @ApiProperty({ type: ReleaseUser })
  user!: ReleaseUser

  @ApiProperty({ type: [ReleaseGenre] })
  genres!: ReleaseGenre[]
}
