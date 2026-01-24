import { forwardRef } from 'react'
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'
import cn from 'clsx'

import { CodeRootProps } from '../types'
import { CodeContext } from '../lib'
import styles from '../styles/index.module.scss'

export const CodeRoot = forwardRef<HTMLDivElement, CodeRootProps>(
  ({ children, error, className, ...props }, ref) => {
    return (
      <CodeContext.Provider value={{ error }}>
        <OneTimePasswordField.Root
          className={cn(styles.root, className)}
          ref={ref}
          {...props}
        >
          {children}
        </OneTimePasswordField.Root>
      </CodeContext.Provider>
    )
  },
)
