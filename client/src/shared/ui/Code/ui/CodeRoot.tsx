import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'
import cn from 'clsx'

import { CodeRootProps } from '../types'
import { CodeContext } from '../lib'
import styles from '../styles/index.module.scss'

export const CodeRoot = ({
  children,
  error,
  loading,
  className,
  ...props
}: CodeRootProps) => {
  return (
    <CodeContext.Provider value={{ error, loading }}>
      <OneTimePasswordField.Root
        className={cn(styles.root, className)}
        {...props}
      >
        {children}
      </OneTimePasswordField.Root>
    </CodeContext.Provider>
  )
}
