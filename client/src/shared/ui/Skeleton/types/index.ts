import { HTMLAttributes, Ref } from 'react'

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>
}
