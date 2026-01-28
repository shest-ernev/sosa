import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Avatar, Button, Dropdown } from '@/shared/ui'
import { LogOut } from '@/features'
import { routes } from '@/shared/config'
import { useGetUserQuery } from '@/shared/api'
import ProfileIcon from '@/shared/assets/svg/people.svg?react'
import SettingsIcon from '@/shared/assets/svg/settings.svg?react'
import NOtificationsIcon from '@/shared/assets/svg/notifications.svg?react'

import styles from '../../styles/index.module.scss'

export const HeaderDropdown = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  const { data, isLoading } = useGetUserQuery()

  return (
    <Dropdown.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dropdown.Trigger asChild={true}>
        <Button
          className={styles.dropdownTrigger}
          loading={isLoading}
        >
          <Avatar
            src={data?.data.avatar}
            name={data?.data.name}
            className={styles.avatar}
          />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content
        sideOffset={10}
        side='bottom'
        align='end'
        className={styles.dropdownContent}
      >
        <Dropdown.Item
          className={styles.dropdownItem}
          onClick={() => setOpen(false)}
          asChild={true}
        >
          <Link to={routes.profile}>
            <div className={styles.dropdownSection}>
              <ProfileIcon className={styles.dropdownIcon} />
              <span className={styles.dropdownText}>{t('header.profile')}</span>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.dropdownItem}
          asChild={true}
          onClick={() => setOpen(false)}
        >
          <Link to={routes.settings}>
            <div className={styles.dropdownSection}>
              <SettingsIcon className={styles.dropdownIcon} />
              <span className={styles.dropdownText}>
                {t('header.settings')}
              </span>
            </div>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.dropdownItem}
          asChild={true}
          onClick={() => setOpen(false)}
        >
          <Link to={routes.notifications}>
            <div className={styles.dropdownSection}>
              <NOtificationsIcon className={styles.dropdownIcon} />
              <span className={styles.dropdownText}>
                {t('header.notifications')}
              </span>
            </div>
            <div className={styles.notificationsIndicator} />
          </Link>
        </Dropdown.Item>
        <LogOut onClose={() => setOpen(false)} />
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
