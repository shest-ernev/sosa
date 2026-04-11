import { ApiProperty } from '@nestjs/swagger'
import { IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class DeletePasswordCreateData {
  @ApiProperty()
  token!: string
}

export class DeletePasswordSendCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string
}

export class DeletePasswordCheckCodeBody {
  @IsJWT({ message: 'Send JWT token' })
  @ApiProperty()
  token!: string

  @IsString({ message: 'Send string for code' })
  @IsNotEmpty({ message: 'Please send code' })
  @ApiProperty()
  code!: string
}
