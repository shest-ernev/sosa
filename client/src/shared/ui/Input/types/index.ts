import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  MouseEvent,
} from 'react'

export type InputTypes = 'text' | 'password' | 'number' | 'search'

export type InputContextValue = {
  type: InputTypes
  defaultType: InputTypes
  focus: boolean
  error: boolean
  setType: (v: InputTypes) => void
  setFocus: (v: boolean) => void
}

export type InputProviderProps = {
  children: ReactNode
  error?: boolean
  type?: InputTypes
}

export type InpuLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export type InputRootProps = LabelHTMLAttributes<HTMLLabelElement> & {
  type?: InputTypes
  error?: boolean
}

export type InputValueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
>

export type InputToggleClickEvent = Omit<
  MouseEvent<HTMLButtonElement>,
  'view'
> & {
  view: boolean
}

export type InputToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'onClick' | 'children'
> & {
  onClick?: (e: InputToggleClickEvent) => void
}
