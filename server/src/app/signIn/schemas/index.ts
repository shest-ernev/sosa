import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsNotEmpty, IsJWT } from 'class-validator'

export class SignInCreateTokenBody {
  @IsEmail({}, { message: 'Please send correct email' })
  @IsString({ message: 'Please send string' })
  @IsNotEmpty({ message: 'Please send email' })
  @ApiProperty()
  email: string
}

export class SignInCreateTokenData {
  @ApiProperty()
  token: string
}

export class SignInCheckCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token: string

  @ApiProperty()
  @IsString({ message: 'Please send string for code' })
  @IsNotEmpty({ message: 'Please send code' })
  code: string
}

export class SignInCheckCodePasswordData {
  password: boolean
}

export class SignInCheckCodeData {
  @ApiProperty({ required: false })
  access_token: string

  @ApiProperty({ required: false })
  refresh_token: string

  @ApiProperty({ required: false })
  token?: string
}

export class SignInSendCodeBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token: string
}

export class SignInCheckPassBody {
  @ApiProperty()
  @IsJWT({ message: 'Please send jwt token' })
  @IsNotEmpty({ message: 'Please send token' })
  token: string

  @ApiProperty()
  @IsString({ message: 'Plase send string' })
  @IsNotEmpty({ message: 'Please send password' })
  password: string
}

export class SignInCheckPassData {
  @ApiProperty()
  access_token: string

  @ApiProperty()
  refresh_token: string
}
