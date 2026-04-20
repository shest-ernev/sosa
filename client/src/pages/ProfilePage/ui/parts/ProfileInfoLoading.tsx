import { Skeleton } from '@/shared/ui'

import styles from '../../styles/index.module.scss'

export const ProfilePageLoading = () => {
  return (
    <div className={styles.content}>
      <div className={styles.userLoading}>
        <Skeleton className={styles.avatarLoading} />
        <div className={styles.paramsLoading}>
          <Skeleton className={styles.nameLoading} />
          <div className={styles.btnsLoading}>
            {[...new Array(3)].map((_, index) => (
              <Skeleton
                className={styles.btnSkeleton}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
