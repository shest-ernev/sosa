import { useTranslation } from 'react-i18next'

import { useStore } from '@/shared/hooks'
import { useEditUserSettingsMutation } from '@/shared/api'
import { components } from '@/shared/types'

export const useEditSettings = () => {
  const { t } = useTranslation()
  const { toast } = useStore()

  const { mutateAsync, isPending } = useEditUserSettingsMutation({
    onError: () => {
      toast.add({
        type: 'danger',
        text: t('userSettings.error'),
      })
    },
  })

  const handleEdit = async (
    params: components['schemas']['EditUserSettingsBody'],
  ) => {
    try {
      await mutateAsync(params)
    } catch (err) {
      console.log(err)
    }
  }

  return [handleEdit, isPending] as const
}
