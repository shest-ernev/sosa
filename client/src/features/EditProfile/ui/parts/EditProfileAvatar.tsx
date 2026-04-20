import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, Controller } from 'react-hook-form'

import { Modal, Dropdown, Text, UploadFile, Button, Cropper } from '@/shared/ui'
import { useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import AvatarIcon from '@/shared/assets/svg/avatar.svg?react'
import UploadIcon from '@/shared/assets/svg/upload.svg?react'
import {
  useEditUserAvatarMutation,
  queryClient,
  getUserKey,
  useDeleteUserAvatarMutation,
} from '@/shared/api'

import { useFileForm } from '../../hooks'
import { fileFormFields } from '../../config'
import { fileFormDefault } from '../../constants'
import { EditProfileAvatarProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const EditProfileAvatar = ({ avatar }: EditProfileAvatarProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { toast } = useStore()
  const form = useFileForm()

  const { mutateAsync: deleteAsync, isPending: isDeletePending } =
    useDeleteUserAvatarMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(
            getTranslate(`profile.editAvatar.errors.${err.status}`),
            t('profile.editAvatar.errorFallback'),
          ),
        })
      },
    })

  const { mutateAsync: updateAsync, isPending: isUpdatePending } =
    useEditUserAvatarMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(
            getTranslate(`profile.editAvatar.errors.${err.status}`),
            t('profile.editAvatar.errorFallback'),
          ),
        })
      },
    })

  const { handleSubmit, setValue, control, watch, reset } = form

  const file = watch(fileFormFields.file)

  const handleUpload = (file?: File, e?: ChangeEvent<HTMLInputElement>) => {
    setValue(fileFormFields.file, file, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })

    if (e) {
      e.currentTarget.value = ''
    }
  }

  const handleOpenChange = (v: boolean) => {
    if (v) {
      reset(fileFormDefault)
    }

    setOpen(v)
  }

  const handleDelete = async () => {
    try {
      await deleteAsync()

      await queryClient.invalidateQueries({
        queryKey: [getUserKey],
      })

      toast.add({
        type: 'success',
        text: t('profile.editAvatar.deleted'),
      })

      handleOpenChange(false)
    } catch (err) {
      console.log(err)
    }
  }

  const submit = handleSubmit(async (v) => {
    try {
      const file = new File([v.image], v.image.type.replace('/', '.'), {
        type: v.image.type,
      })

      const formData = new FormData()

      formData.append('file', file)

      await updateAsync(formData)

      await queryClient.invalidateQueries({
        queryKey: [getUserKey],
      })

      handleOpenChange(false)

      toast.add({
        type: 'success',
        text: t('profile.editAvatar.success'),
      })
    } catch (err) {
      console.log(err)
    }
  })

  const handleCompleate = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (blob) {
        setValue(fileFormFields.image, blob, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
      }
    })
  }

  return (
    <Modal.Provider
      onOpenChange={handleOpenChange}
      open={open}
    >
      <Modal.Trigger asChild={true}>
        <Dropdown.Item>
          <AvatarIcon className={styles.iconDropdown} />
          {t('profile.avatar')}
        </Dropdown.Item>
      </Modal.Trigger>
      <FormProvider {...form}>
        <Modal.Content
          className={styles.viewModal}
          asChild={true}
        >
          <form onSubmit={submit}>
            <div className={styles.modalText}>
              <Text
                color='primary'
                size='l'
              >
                {t('profile.editAvatar.title')}
              </Text>
              <Text color='secondary'>
                {t('profile.editAvatar.description')}
              </Text>
            </div>
            <Controller
              name={fileFormFields.file}
              control={control}
              render={({ fieldState: { error } }) =>
                file ? (
                  <div className={styles.cropperContainer}>
                    <Cropper
                      className={styles.cropper}
                      src={URL.createObjectURL(file)}
                      onCompleate={handleCompleate}
                    />
                  </div>
                ) : (
                  <div className={styles.uploadContainer}>
                    <UploadFile
                      className={styles.upload}
                      error={!!error}
                      accept='png, jpeg, jpg, avif, webp'
                      onChange={(e) =>
                        handleUpload(e.currentTarget.files?.[0], e)
                      }
                      onDrop={(e) => handleUpload(e.dataTransfer.files?.[0])}
                    >
                      <UploadIcon className={styles.uploadIcon} />
                      <Text>{t('profile.editAvatar.uploadHint')}</Text>
                    </UploadFile>
                    {error?.message && (
                      <Text
                        size='s'
                        color='danger'
                      >
                        {t(getTranslate(error.message))}
                      </Text>
                    )}
                  </div>
                )
              }
            />
            <div className={styles.modalBtns}>
              <div className={styles.modalRightBtns}>
                {avatar && (
                  <Button
                    variant='text'
                    color='danger'
                    className='modalBtn'
                    type='button'
                    loading={isDeletePending}
                    onClick={handleDelete}
                  >
                    {t('profile.editAvatar.delete')}
                  </Button>
                )}
                {watch(fileFormFields.file) && (
                  <Button
                    className='modalBtn'
                    variant='text'
                    type='button'
                    onClick={() => setValue(fileFormFields.file, undefined)}
                  >
                    {t('profile.editAvatar.reset')}
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
                    {t('profile.editAvatar.close')}
                  </Button>
                </Modal.Close>
                <Button
                  className='modalBtn'
                  variant='text'
                  color='primary'
                  type='submit'
                  loading={isUpdatePending}
                >
                  {t('profile.editAvatar.save')}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Content>
      </FormProvider>
    </Modal.Provider>
  )
}
