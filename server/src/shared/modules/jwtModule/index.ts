import { JwtModule } from '@nestjs/jwt'

import { jwt } from '@/shared/config'

export const jwtModule = () => {
  return JwtModule.register({
    global: true,
    secret: jwt.secret,
  })
}
