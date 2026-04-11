import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class ChangePasswordEmailBody {
  @IsEmail({}, { message: 'Please send correct email' })
  @IsString({ message: 'Please send string' })
  @IsNotEmpty({ message: 'Please send email' })
  @ApiProperty()
  email!: string
}

export class ChangePasswordEmailData {
  @ApiProperty()
  token!: string
}

export class ChangePasswordCheckCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string

  @IsString({ message: 'Send string for code' })
  @ApiProperty()
  code!: string
}

export class ChangePasswordCheckCodeData {
  @ApiProperty()
  token!: string
}

export class ChangePasswordNewBody {
  @ApiProperty()
  @IsJWT({ message: 'Send JWT token' })
  token!: string

  @Matches(/[A-Za-z\d@$!%*?&]+/, {
    message:
      'Please enter latin letters, numbers or special symbvols for password',
  })
  @IsString()
  @MinLength(7, { message: 'Minimum length password 7 characters' })
  @ApiProperty()
  password!: string
}

export class ChangePasswordSendCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string
}
