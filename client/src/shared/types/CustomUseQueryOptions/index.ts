import { UndefinedInitialDataOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import { MessageResponse } from '../MessageResponse'

export type CustomUseQueryOptions<D = unknown> = Omit<
  UndefinedInitialDataOptions<AxiosResponse<D>, MessageResponse>,
  'queryFn' | 'queryKey'
>
