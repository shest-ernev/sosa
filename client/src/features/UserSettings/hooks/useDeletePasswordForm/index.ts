import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { deletePasswordFormDefault } from '../../constants'
import { deletePasswordFormSchema } from '../../validations'
import { DeletePasswordFormFields } from '../../types'

export const useDeletePasswordForm = () => {
  return useForm<DeletePasswordFormFields>({
    defaultValues: deletePasswordFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(deletePasswordFormSchema),
  })
}
