// /\.(png|jpeg|jpg|avif)$/

export type UploadFileParams = {
  path: string
  validation: RegExp
  message: string
}
