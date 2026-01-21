import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/ui'
import SearchIcon from '@/shared/assets/svg/search.svg?react'

import styles from '../../styles/index.module.scss'

export const HeaderSearch = () => {
  const { t } = useTranslation()

  return (
    <Input.Provider type='search'>
      <Input.Label className={styles.input}>
        <SearchIcon className={styles.searchIcon} />
        <Input.Text placeholder={t('header.search')} />
      </Input.Label>
    </Input.Provider>
  )
}
