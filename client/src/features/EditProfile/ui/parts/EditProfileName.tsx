import { useState } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import NameIcon from '@/shared/assets/svg/name.svg?react'
import { getUserKey, queryClient, useEditUserNameMutation } from '@/shared/api'
import { useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { Button, Dropdown, Input, Modal, Text } from '@/shared/ui'

import { nameFormFields } from '../../config'
import { useNameForm } from '../../hooks'
import { EditProfileNameProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const EditProfileName = ({ name }: EditProfileNameProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { toast } = useStore()
  const form = useNameForm()

  const { mutateAsync, isPending } = useEditUserNameMutation({
    onError: (err) => {
      toast.add({
        type: 'danger',
        text: t(
          getTranslate(`profile.editName.errors.${err.status}`),
          t('profile.editName.errorFallback'),
        ),
      })
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = form

  const handleOpenChange = (v: boolean) => {
    if (v) {
      reset({ [nameFormFields.name]: name })
    }

    setOpen(v)
  }

  const submit = handleSubmit(async (values) => {
    try {
      await mutateAsync({ name: values.name })

      await queryClient.invalidateQueries({
        queryKey: [getUserKey],
      })

      handleOpenChange(false)

      toast.add({
        type: 'success',
        text: t('profile.editName.success'),
      })
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Modal.Provider
      onOpenChange={handleOpenChange}
      open={open}
    >
      <Modal.Trigger asChild={true}>
        <Dropdown.Item>
          <NameIcon className={styles.iconDropdown} />
          {t('profile.name')}
        </Dropdown.Item>
      </Modal.Trigger>
      <FormProvider {...form}>
        <Modal.Content
          className={styles.nameModal}
          asChild={true}
        >
          <form onSubmit={submit}>
            <div className={styles.modalText}>
              <Text
                color='primary'
                size='l'
              >
                {t('profile.editName.title')}
              </Text>
              <Text color='secondary'>{t('profile.editName.description')}</Text>
            </div>
            <Controller
              name={nameFormFields.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.inputContainer}>
                  <Input.Root
                    className={styles.input}
                    error={!!error}
                    type='text'
                  >
                    <NameIcon className={styles.inputIcon} />
                    <Input.Value
                      maxLength={300}
                      placeholder={t('profile.editName.placeholder')}
                      {...field}
                    />
                  </Input.Root>
                  {error?.message && (
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
            <div className={styles.modalBtns}>
              <div className={styles.modalRightBtns}>
                {isDirty && (
                  <Button
                    className='modalBtn'
                    variant='text'
                    type='button'
                    onClick={() =>
                      setValue(nameFormFields.name, name, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  >
                    {t('profile.editName.reset')}
                  </Button>
                )}
              </div>
              <div className={styles.modalRightBtns}>
                <Modal.Close asChild={true}>
                  <Button
                    className='modalBtn'
                    color='danger'
                    variant='text'
                    type='button'
                  >
                    {t('profile.editName.close')}
                  </Button>
                </Modal.Close>
                <Button
                  className='modalBtn'
                  variant='text'
                  color='primary'
                  type='submit'
                  loading={isPending}
                >
                  {t('profile.editName.save')}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Content>
      </FormProvider>
    </Modal.Provider>
  )
}
