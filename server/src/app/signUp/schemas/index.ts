import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDataBody {
  @ApiProperty()
  @IsString({ message: 'Please enter string for name' })
  @IsNotEmpty({ message: 'Please enter name' })
  @MinLength(2, { message: 'Maximum length name 300 characters' })
  @MaxLength(300, { message: 'Minimum length name 2 characters' })
  name: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter email' })
  @IsEmail({}, { message: 'Please enter valid email' })
  email: string
}

export class SignUpDataData {
  @ApiProperty()
  token: string
}

export class SignUpCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token: string

  @ApiProperty()
  @IsString({ message: 'Please send string for code' })
  @IsNotEmpty({ message: 'Please send code' })
  code: string
}

export class SignUpCodeData {
  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}

export class SignUpSendCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token: string
}
