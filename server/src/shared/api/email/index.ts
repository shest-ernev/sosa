import * as nodemailer from 'nodemailer'

import { transporter } from '@/shared/config'

export const email = nodemailer.createTransport({
  host: transporter.host,
  port: transporter.port,
  secure: true,
  auth: {
    user: transporter.user,
    pass: transporter.password,
  },
})
