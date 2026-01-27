export type ToastTypes = 'danger' | 'info' | 'success'

export type Toast = {
  id: string
  text: string
  type: ToastTypes
}

export type AddToastParams = {
  text: string
  type: ToastTypes
}
