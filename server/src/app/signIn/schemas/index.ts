import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsNotEmpty, IsJWT } from 'class-validator'

export class SignInEmailBody {
  @IsEmail({}, { message: 'Please send correct email' })
  @IsString({ message: 'Please send string' })
  @IsNotEmpty({ message: 'Please send email' })
  @ApiProperty()
  email!: string
}

export class SignInEmailData {
  @ApiProperty()
  token!: string
}

export class SignInCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token!: string

  @ApiProperty()
  @IsString({ message: 'Please send string for code' })
  @IsNotEmpty({ message: 'Please send code' })
  code!: string
}

export class SignInCheckCodePasswordData {
  password!: boolean
}

export class SignInCodeData {
  @ApiProperty({ required: false })
  access_token?: string

  @ApiProperty({ required: false })
  refresh_token?: string

  @ApiProperty({ required: false })
  token?: string
}

export class SignInSendCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token!: string
}

export class SignInPasswordBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token!: string

  @ApiProperty()
  @IsString({ message: 'Plase send string' })
  @IsNotEmpty({ message: 'Please send password' })
  password!: string
}

export class SignInPasswordData {
  @ApiProperty()
  access_token!: string

  @ApiProperty()
  refresh_token!: string
}
