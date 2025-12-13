import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UserEditNameBody {
  @ApiProperty()
  @IsString({ message: 'Please enter string for name' })
  @IsNotEmpty({ message: 'Please enter name' })
  @MinLength(2, { message: 'Maximum length name 300 characters' })
  @MaxLength(300, { message: 'Minimum length name 2 characters' })
  name: string
}

export class EditAvatarQuery {
  @ApiProperty()
  type?: string
}
