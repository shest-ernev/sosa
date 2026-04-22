import { useTranslation } from 'react-i18next'

import { Button, Dropdown } from '@/shared/ui'
import PencilIcon from '@/shared/assets/svg/pencil.svg?react'
import DescriptionIcon from '@/shared/assets/svg/description.svg?react'

import { EditProfileProps } from '../types'
import styles from '../styles/index.module.scss'

import { EditProfileAvatar } from './parts/EditProfileAvatar'
import { EditProfileCover } from './parts/EditProfileCover'
import { EditProfileName } from './parts/EditProfileName'

export const EditProfile = ({ avatar, cover, name }: EditProfileProps) => {
  const { t } = useTranslation()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button className={styles.btn}>
          <PencilIcon className={styles.icon} />
          {t('profile.edit')}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content
        align='start'
        className={styles.content}
      >
        <EditProfileAvatar avatar={avatar} />
        <EditProfileCover cover={cover} />
        <EditProfileName name={name} />
        <Dropdown.Item>
          <DescriptionIcon className={styles.iconDropdown} />
          {t('profile.description')}
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
