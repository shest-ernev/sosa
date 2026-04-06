import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDebounce, useStore } from '@/shared/hooks'
import { useEditSettingsUserSettingsMutation } from '@/shared/api'
import { components } from '@/shared/types'

export const useEditSettings = <
  T extends keyof components['schemas']['EditUserSettingsBody'],
>(
  key: T,
  defaultValue: components['schemas']['EditUserSettingsBody'][T],
) => {
  const [value, setValue] = useState(defaultValue)
  const { t } = useTranslation()
  const { toast } = useStore()

  const { mutateAsync, isPending } = useEditSettingsUserSettingsMutation({
    onError: () => {
      toast.add({
        type: 'danger',
        text: t('userSettings.error'),
      })
    },
  })

  useDebounce(
    async () => {
      try {
        await mutateAsync({
          [key]: value,
        })
      } catch (err) {
        console.log(err)
      }
    },
    300,
    [value],
  )

  return [value, setValue, isPending] as const
}
