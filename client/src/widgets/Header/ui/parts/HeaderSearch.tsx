import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/ui'
import SearchIcon from '@/shared/assets/svg/search.svg?react'

import styles from '../../styles/index.module.scss'

export const HeaderSearch = () => {
  const { t } = useTranslation()

  return (
    <Input.Root
      className={styles.input}
      type='search'
    >
      <SearchIcon className={styles.searchIcon} />
      <Input.Value placeholder={t('header.search')} />
    </Input.Root>
  )
}
