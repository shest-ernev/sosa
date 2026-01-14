import { observer } from 'mobx-react-lite'
import cn from 'clsx'

import { useResizeLibrary } from '../hooks'
import styles from '../styles/index.module.scss'

export const Library = observer(() => {
  const { width, startResizing, isResizing, toggleHidden } = useResizeLibrary({
    min: 200,
    max: 400,
    hiddenWidth: 70,
  })

  return (
    <div className={styles.container}>
      <div
        className={styles.library}
        style={{ width }}
      ></div>
      <button
        className={styles.resize}
        onMouseDown={startResizing}
        onDoubleClick={toggleHidden}
      >
        <div
          className={cn(
            styles.resizeThumb,
            isResizing && styles.resizeThumbActive
          )}
        />
      </button>
    </div>
  )
})
