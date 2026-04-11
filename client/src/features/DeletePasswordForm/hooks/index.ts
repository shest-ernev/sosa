import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { DeletePasswordFormFields } from '../types'
import { deletePasswordFormFields } from '../config'
import { deletePasswordFormSchema } from '../validations'

export const useDeletePasswordForm = () => {
  return useForm<DeletePasswordFormFields>({
    defaultValues: {
      [deletePasswordFormFields.code]: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(deletePasswordFormSchema),
  })
}
