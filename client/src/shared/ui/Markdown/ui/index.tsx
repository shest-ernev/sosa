import cn from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MarkdownProps } from '../types'
import styles from '../styles/index.module.scss'

export const Markdown = ({
  children,
  className,
  ref,
  ...props
}: MarkdownProps) => {
  const getLinkIcon = (href?: string) => {
    if (!href) return ''

    try {
      const { hostname } = new URL(href)

      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
    } catch {
      return ''
    }
  }

  return (
    <div
      className={cn(className)}
      ref={ref}
      {...props}
    >
      <ReactMarkdown
        allowedElements={['p', 'a']}
        remarkPlugins={[remarkGfm]}
        unwrapDisallowed={true}
        components={{
          p: ({ children: text, className: paragraphClassName, ...pProps }) => (
            <p
              className={cn(styles.text, paragraphClassName)}
              {...pProps}
            >
              {text}
            </p>
          ),
          a: ({ children: linkText, className: linkClassName, ...aProps }) => {
            const icon = getLinkIcon(aProps.href)

            return (
              <a
                className={cn(styles.link, linkClassName)}
                {...aProps}
              >
                {!!icon && (
                  <img
                    className={styles.linkIcon}
                    src={icon}
                    alt=''
                  />
                )}
                {linkText}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
