import { AxiosError } from 'axios'

export type MessageResponse = AxiosError<{
  message: string
}>
