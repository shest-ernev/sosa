import { Slot } from 'radix-ui'
import cn from 'clsx'

import { Loader } from '../../Loader'

import { ButtonProps } from '../types'
import styles from '../styles/index.module.scss'

export const Button = ({
  className,
  asChild,
  children,
  color = 'secondary',
  variant = 'contain',
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const Comp = asChild && !loading ? Slot.Root : 'button'

  return (
    <Comp
      className={cn(
        styles.button,
        styles[`${color}-${variant}`],
        disabled && styles[`${color}-${variant}-disabled`],
        loading && styles.loading,
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      {asChild && !loading ? (
        children
      ) : (
        <>
          {loading && (
            <div className={styles.loaderContainer}>
              <Loader
                className={styles.loader}
                color={`rgb(var(--button-${color}-${variant}-color))`}
              />
            </div>
          )}
          {children}
        </>
      )}
    </Comp>
  )
}
