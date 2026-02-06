import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/shared/hooks'
import { Text, Select } from '@/shared/ui'
import { langs } from '@/shared/config'
import { ThemeVariants, LangVariants } from '@/shared/types'

import { useEditSettings } from '../../hooks'
import { themesOptions } from '../../constants'
import styles from '../../styles/index.module.scss'

export const UserSettingsView = observer(() => {
  const [editThemeAsync, isEditThemePending] = useEditSettings()
  const [editLangAsync, isEditLangPending] = useEditSettings()
  const { t } = useTranslation()
  const { lang, theme } = useStore()

  const handleEditTheme = async (v: ThemeVariants) => {
    theme.setTheme(v)

    await editThemeAsync({ theme: v })
  }

  const handleEditLang = async (v: LangVariants) => {
    lang.setLang(v)

    await editLangAsync({ lang: v })
  }

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        color='primary'
        size='l'
      >
        {t('userSettings.viewTitle')}
      </Text>
      <div className={styles.sectionItems}>
        <label className={styles.item}>
          <Text>{t('userSettings.theme')}</Text>
          <Select.Root
            value={theme.activeTheme}
            onValueChange={handleEditTheme}
            disabled={isEditThemePending}
          >
            <Select.Trigger className={styles.select}>
              <Select.Value
                placeholder={t('userSettings.selectThemePlaceholder')}
              />
            </Select.Trigger>
            <Select.Content>
              {themesOptions.map((obj) => (
                <Select.Item
                  value={obj.value}
                  key={obj.value}
                >
                  {t(obj.name)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.lang')}</Text>
          <Select.Root
            value={lang.activeLang}
            onValueChange={handleEditLang}
            disabled={isEditLangPending}
          >
            <Select.Trigger className={styles.select}>
              <Select.Value
                placeholder={t('userSettings.selectLangPlaceholder')}
              />
            </Select.Trigger>
            <Select.Content>
              {Object.values(langs).map((obj) => (
                <Select.Item
                  value={obj.name}
                  key={obj.name}
                >
                  {obj.description}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
      </div>
    </div>
  )
})
