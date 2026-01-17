import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import cn from 'clsx'

import { Loader } from '../../Loader'

import { ButtonProps } from '../types'
import styles from '../styles/index.module.scss'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild,
      children,
      color = 'secondary',
      variant = 'contain',
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          styles.button,
          styles[`${color}-${variant}`],
          disabled && styles[`${color}-${variant}-disabled`],
          loading && styles.loading,
          className
        )}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {children}
        {loading && (
          <div className={styles.loaderContainer}>
            <Loader
              className={styles.loader}
              color={`rgb(var(--button-${color}-${variant}-color))`}
            />
          </div>
        )}
      </Comp>
    )
  }
)
