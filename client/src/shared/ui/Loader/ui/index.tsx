import { SVGProps, forwardRef } from 'react'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const Loader = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      className={cn(styles.spinner, className)}
      viewBox='0 0 50 50'
      ref={ref}
      {...props}
    >
      <circle
        className={styles.path}
        cx='25'
        cy='25'
        r='20'
        stroke='currentColor'
        fill='none'
        strokeLinecap='round'
        strokeWidth='5'
      />
    </svg>
  )
)
