import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import cn from 'clsx'

import { routes } from '@/shared/config'
import { Button, Tooltip } from '@/shared/ui'
import HomeIcon from '@/shared/assets/svg/home.svg?react'

import styles from '../../styles/index.module.scss'

export const HeaderHomeLink = () => {
  const { t } = useTranslation()

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild={true}>
          <Button className={styles.homeLinkBtn}>
            <NavLink
              to={routes.home}
              className={({ isActive }) =>
                cn(styles.homeLink, isActive && styles.homeLinkActive)
              }
            >
              <HomeIcon />
            </NavLink>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={15}
          className={styles.homeLinkTooltip}
        >
          {t('header.home')}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
