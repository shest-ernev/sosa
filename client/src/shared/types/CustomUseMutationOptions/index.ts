import { UseMutationOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { MessageResponse } from '../MessageResponse'

export type CustomUseMutationOptions<R = unknown, B = void> = Omit<
  UseMutationOptions<AxiosResponse<R>, MessageResponse, B>,
  'mutationFn' | 'mutationKey'
>
