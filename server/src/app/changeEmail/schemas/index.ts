import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class ChangeEmailEmailBody {
  @IsEmail({}, { message: 'Please send correct email' })
  @IsString({ message: 'Please send string' })
  @IsNotEmpty({ message: 'Please send email' })
  @ApiProperty()
  email!: string
}

export class ChangeEmailEmailData {
  @ApiProperty()
  token!: string
}

export class ChangeEmailSendCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string
}

export class ChangeEmailCheckCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string

  @IsString({ message: 'Send string for code' })
  @IsNotEmpty({ message: 'Please send code' })
  @ApiProperty()
  code!: string
}

export class ChangeEmailCheckCodeData {
  @ApiProperty()
  token!: string
}

export class ChangeEmailNewEmailBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string

  @IsEmail({}, { message: 'Please send correct email' })
  @IsString({ message: 'Please send string' })
  @IsNotEmpty({ message: 'Please send email' })
  @ApiProperty()
  email!: string
}
