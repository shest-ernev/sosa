import { MouseEvent } from 'react'
import cn from 'clsx'

import OpenEyeIcon from '@/shared/assets/svg/openEye.svg?react'
import CloseEyeIcon from '@/shared/assets/svg/closeEye.svg?react'

import { InputToggleProps } from '../types'
import { useInputContext } from '../hooks'
import styles from '../styles/index.module.scss'

export const InputToggle = ({
  className,
  onClick,
  ...props
}: InputToggleProps) => {
  const { type, defaultType, setType } = useInputContext()

  const view = type === 'password' ? false : true

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (view) {
      setType('password')

      onClick?.({
        ...e,
        view: false,
      })
    } else {
      setType('text')

      onClick?.({
        ...e,
        view: true,
      })
    }
  }

  if (defaultType !== 'password') {
    return null
  }

  return (
    <button
      type='button'
      className={cn(styles.toggle, className)}
      onClick={(e) => handleClick(e)}
      {...props}
    >
      {view ? <OpenEyeIcon /> : <CloseEyeIcon />}
    </button>
  )
}
