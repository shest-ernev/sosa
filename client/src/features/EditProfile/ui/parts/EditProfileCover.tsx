import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, Controller } from 'react-hook-form'

import { Modal, Dropdown, Text, UploadFile, Button, Cropper } from '@/shared/ui'
import { useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import CoverIcon from '@/shared/assets/svg/cover.svg?react'
import UploadIcon from '@/shared/assets/svg/upload.svg?react'
import {
  useEditUserCoverMutation,
  queryClient,
  getUserKey,
  useDeleteUserCoverMutation,
} from '@/shared/api'

import { useFileForm } from '../../hooks'
import { fileFormFields } from '../../config'
import { fileFormDefault } from '../../constants'
import { EditProfileCoverProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const EditProfileCover = ({ cover }: EditProfileCoverProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { toast } = useStore()
  const form = useFileForm()

  const { mutateAsync: deleteAsync, isPending: isDeletePending } =
    useDeleteUserCoverMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(
            getTranslate(`profile.editCover.errors.${err.status}`),
            t('profile.editCover.errorFallback'),
          ),
        })
      },
    })

  const { mutateAsync: updateAsync, isPending: isUpdatePending } =
    useEditUserCoverMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(
            getTranslate(`profile.editCover.errors.${err.status}`),
            t('profile.editCover.errorFallback'),
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

      handleOpenChange(false)

      toast.add({
        type: 'success',
        text: t('profile.editCover.deleted'),
      })
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
        text: t('profile.editCover.success'),
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
          <CoverIcon className={styles.iconDropdown} />
          {t('profile.cover')}
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
                {t('profile.editCover.title')}
              </Text>
              <Text color='secondary'>
                {t('profile.editCover.description')}
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
                      aspect={40 / 9}
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
                      <Text>{t('profile.editCover.uploadHint')}</Text>
                    </UploadFile>
                    {error?.message && (
                      <Text
                        size='s'
                        color='danger'
                      >
                        {t(
                          getTranslate(
                            error.message.replace(
                              'profile.editAvatar.errors',
                              'profile.editCover.errors',
                            ),
                          ),
                        )}
                      </Text>
                    )}
                  </div>
                )
              }
            />
            <div className={styles.modalBtns}>
              <div className={styles.modalRightBtns}>
                {cover && (
                  <Button
                    variant='text'
                    color='danger'
                    className='modalBtn'
                    type='button'
                    loading={isDeletePending}
                    onClick={handleDelete}
                  >
                    {t('profile.editCover.delete')}
                  </Button>
                )}
                {watch(fileFormFields.file) && (
                  <Button
                    className='modalBtn'
                    variant='text'
                    type='button'
                    onClick={() => setValue(fileFormFields.file, undefined)}
                  >
                    {t('profile.editCover.reset')}
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
                    {t('profile.editCover.close')}
                  </Button>
                </Modal.Close>
                <Button
                  className='modalBtn'
                  variant='text'
                  color='primary'
                  type='submit'
                  loading={isUpdatePending}
                >
                  {t('profile.editCover.save')}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Content>
      </FormProvider>
    </Modal.Provider>
  )
}
