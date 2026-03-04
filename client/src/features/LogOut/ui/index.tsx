import { useState, useRef } from 'react'
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
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { toast, auth } = useStore()
  const modalRef = useRef<HTMLDivElement>(null)

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
      await mutateAsync()

      localStorage.removeItem(ls.accessToken)
      localStorage.removeItem(ls.refreshToken)
      auth.setIsAuth(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      onClose?.()
    }

    setOpen(v)
  }

  return (
    <Modal.Provider
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Modal.Trigger asChild={true}>
        <Dropdown.Item className={cn(styles.dropdownItem, styles.logOut)}>
          <div className={styles.dropdownSection}>
            <LogOutIcon className={styles.dropdownIcon} />
            <span className={styles.dropdownText}>{t('header.logOut')}</span>
          </div>
        </Dropdown.Item>
      </Modal.Trigger>
      <Modal.Content
        className={styles.content}
        ref={modalRef}
      >
        <Text color='primary'>{t('logOut.text')}</Text>
        <div className={styles.btns}>
          <Modal.Close asChild={true}>
            <Button
              variant='text'
              color='primary'
              className={styles.btn}
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
