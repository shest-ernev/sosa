import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { fileFormDefault } from '../constants'
import { fileFormSchema } from '../validations'
import { FileFormFields } from '../types'

export const useFileForm = () => {
  return useForm<FileFormFields>({
    defaultValues: fileFormDefault,
    mode: 'onChange',
    resolver: zodResolver(fileFormSchema),
  })
}
