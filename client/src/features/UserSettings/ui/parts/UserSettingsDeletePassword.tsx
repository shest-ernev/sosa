import { FormProvider, Controller } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, Button, Text, Input } from '@/shared/ui'
import { useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import {
  useChangePasswordDeleteMutation,
  getUserSettingsKey,
  queryClient,
} from '@/shared/api'
import TrashIcon from '@/shared/assets/svg/trash.svg?react'

import { deletePasswordFormFields } from '../../config'
import { useDeletePasswordForm } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const UserSettingsDeletePassword = () => {
  const [open, setOpen] = useState(false)
  const { toast } = useStore()
  const form = useDeletePasswordForm()
  const { t } = useTranslation()

  const { mutateAsync, isPending } = useChangePasswordDeleteMutation({
    onError: (err) => {
      if (err.status) {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`userSettings.errors.${err.status}`), 'Error'),
        })
      }
    },
  })

  const { handleSubmit, control } = form

  const submit = handleSubmit(async (v) => {
    try {
      const { password } = v

      await mutateAsync({ password })

      await queryClient.invalidateQueries({ queryKey: [getUserSettingsKey] })

      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Modal.Provider
      open={open}
      onOpenChange={setOpen}
    >
      <Modal.Trigger asChild={true}>
        <Button
          className={styles.editEmailBtn}
          color='danger'
        >
          <span>{t('userSettings.deletePassword')}</span>
          <TrashIcon />
        </Button>
      </Modal.Trigger>
      <Modal.Content className={styles.modal}>
        <div className={styles.modalText}>
          <Text
            color='primary'
            weight={700}
            size='l'
          >
            {t('userSettings.deletePassword')}
          </Text>
          <Text>{t('userSettings.deletePasswordDescription')}</Text>
        </div>
        <FormProvider {...form}>
          <form
            className={styles.modalForm}
            onSubmit={submit}
          >
            <div className={styles.inputs}>
              <Controller
                name={deletePasswordFormFields.password}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className={styles.inputContainer}>
                    <Input.Root
                      type='password'
                      className={styles.input}
                      error={!!error}
                    >
                      <Input.Value
                        placeholder={t(
                          'userSettings.deletePasswordPlaceholder',
                        )}
                        {...field}
                      />
                      <Input.Toogle />
                    </Input.Root>
                    {!!error?.message && (
                      <Text
                        size='s'
                        color='danger'
                      >
                        {t(getTranslate(error.message))}
                      </Text>
                    )}
                  </div>
                )}
              />
            </div>
            <div className={styles.modalBtns}>
              <Modal.Close asChild={true}>
                <Button
                  className={styles.modalBtn}
                  type='button'
                  color='primary'
                  variant='text'
                >
                  {t('userSettings.deletePasswordCancel')}
                </Button>
              </Modal.Close>
              <Button
                className={styles.modalBtn}
                color='danger'
                variant='text'
                loading={isPending}
                type='submit'
              >
                {t('userSettings.deletePasswordSubmit')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal.Content>
    </Modal.Provider>
  )
}
