import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import cn from 'clsx'

import { useStore } from '@/shared/hooks'
import { ls } from '@/shared/config'
import { Button, Dropdown, Modal, Text } from '@/shared/ui'
import { useLogOutMutation } from '@/shared/api'
import LogOutIcon from '@/shared/assets/svg/logOut.svg?react'

import { LogOutProps } from '../types'
import styles from '../styles/index.module.scss'

export const LogOut = observer(({ onClose }: LogOutProps) => {
  const { t } = useTranslation()
  const { toast, auth } = useStore()

  const { mutateAsync } = useLogOutMutation({
    onError: () => {
      toast.add({
        type: 'danger',
        text: t('logOut.error'),
      })
    },
  })

  const handleLogOut = async () => {
    try {
      localStorage.removeItem(ls.accessToken)
      localStorage.removeItem(ls.refreshToken)

      auth.setIsAuth(false)

      await mutateAsync()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal.Provider>
      <Modal.Trigger asChild={true}>
        <Dropdown.Item className={cn(styles.dropdownItem, styles.logOut)}>
          <div className={styles.dropdownSection}>
            <LogOutIcon className={styles.dropdownIcon} />
            <span className={styles.dropdownText}>{t('header.logOut')}</span>
          </div>
        </Dropdown.Item>
      </Modal.Trigger>
      <Modal.Content className={styles.content}>
        <Text color='primary'>{t('logOut.text')}</Text>
        <div className={styles.btns}>
          <Modal.Close asChild={true}>
            <Button
              variant='text'
              color='primary'
              className={styles.btn}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Modal.Close>
          <Button
            color='danger'
            variant='text'
            className={styles.btn}
            onClick={handleLogOut}
          >
            {t('logOut.yes')}
          </Button>
        </div>
      </Modal.Content>
    </Modal.Provider>
  )
})
