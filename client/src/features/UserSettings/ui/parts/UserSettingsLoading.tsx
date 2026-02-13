import { Skeleton } from '@/shared/ui'

import styles from '../../styles/index.module.scss'

export const UserSettingsLoading = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.skeletonTitle} />
      <div className={styles.section}>
        <Skeleton className={styles.sectionTitleSkeleton} />
        {[...new Array(2)].map((_, index) => (
          <div
            className={styles.item}
            key={index}
          >
            <Skeleton className={styles.skeletonText} />
            <Skeleton className={styles.skeletonValue} />
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <Skeleton className={styles.sectionTitleSkeleton} />
        {[...new Array(2)].map((_, index) => (
          <div
            className={styles.item}
            key={index}
          >
            <Skeleton className={styles.skeletonText} />
            <Skeleton className={styles.skeletonValue} />
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <Skeleton className={styles.sectionTitleSkeleton} />
        {[...new Array(5)].map((_, index) => (
          <div
            className={styles.item}
            key={index}
          >
            <Skeleton className={styles.skeletonText} />
            <Skeleton className={styles.skeletonValue} />
          </div>
        ))}
      </div>
      <div className={styles.section}>
        <Skeleton className={styles.sectionTitleSkeleton} />
        {[...new Array(3)].map((_, index) => (
          <div
            className={styles.item}
            key={index}
          >
            <Skeleton className={styles.skeletonText} />
            <Skeleton className={styles.skeletonValue} />
          </div>
        ))}
      </div>
    </div>
  )
}
