import { Ref } from 'react'
import { Toast } from 'radix-ui'

export type ToastRootProps = Toast.ToastProps & {
  ref?: Ref<HTMLLIElement>
}
