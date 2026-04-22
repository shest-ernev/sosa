import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { fileFormDefault, nameFormDefault } from '../constants'
import { fileFormSchema, nameFormSchema } from '../validations'
import { FileFormFields, NameFormFields } from '../types'

export const useFileForm = () => {
  return useForm<FileFormFields>({
    defaultValues: fileFormDefault,
    mode: 'onChange',
    resolver: zodResolver(fileFormSchema),
  })
}

export const useNameForm = () => {
  return useForm<NameFormFields>({
    defaultValues: nameFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(nameFormSchema),
  })
}
