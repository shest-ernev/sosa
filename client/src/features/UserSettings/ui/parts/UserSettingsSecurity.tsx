import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

import { Text, Button } from '@/shared/ui'
import { routes } from '@/shared/config'
import { useDeletePasswordCreateMutation } from '@/shared/api'
import { useStore } from '@/shared/hooks'
import PencilIcon from '@/shared/assets/svg/pencil.svg?react'
import TrashIcon from '@/shared/assets/svg/trash.svg?react'

import { UserSettingsSecurityProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const UserSettingsSecurity = ({
  password,
  email,
}: UserSettingsSecurityProps) => {
  const { t } = useTranslation()
  const { toast } = useStore()
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useDeletePasswordCreateMutation({
    onError: () => {
      toast.add({
        type: 'danger',
        text: t('userSettings.deletePasswordError'),
      })
    },
  })

  const handleDelete = async () => {
    try {
      const { data } = await mutateAsync()

      navigate(`${routes.deletePassword}?token=${data.token}&email=${email}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        color='primary'
        size='l'
      >
        {t('userSettings.security')}
      </Text>
      <div className={styles.item}>
        <Text>{t('userSettings.email')}</Text>
        <Button
          className={styles.editBtn}
          asChild={true}
        >
          <Link to={routes.changeEmail}>
            <span>{t('userSettings.editEmail')}</span>
            <PencilIcon />
          </Link>
        </Button>
      </div>
      <div className={styles.item}>
        <Text>{t('userSettings.password')}</Text>
        <div className={styles.btns}>
          <Button
            className={styles.editBtn}
            asChild={true}
          >
            <Link to={routes.changePassword}>
              <span>
                {password
                  ? t('userSettings.changePassword')
                  : t('userSettings.addPassowrd')}
              </span>
              <PencilIcon />
            </Link>
          </Button>
          {password && (
            <Button
              className={styles.editBtn}
              onClick={handleDelete}
              loading={isPending}
              color='danger'
            >
              <span>{t('userSettings.deletePassword')}</span>
              <TrashIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
