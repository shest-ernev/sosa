import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

import { UserEntity } from '@/database/entities'

export class GetUserData extends PickType(UserEntity, [
  'name',
  'avatar',
  'cover',
  'role',
  'email',
  'description',
]) {}

export class UserEditNameBody {
  @ApiProperty()
  @IsString({ message: 'Please enter string for name' })
  @IsNotEmpty({ message: 'Please enter name' })
  @MinLength(2, { message: 'Minimum length name 2 characters' })
  @MaxLength(300, { message: 'Maximum length name 300 characters' })
  name!: string
}

export class UserEditDescriptionBody {
  @ApiProperty()
  @IsString({ message: 'Please enter string for description' })
  @MaxLength(1000, { message: 'Maximum length description 1000 characters' })
  description!: string
}
