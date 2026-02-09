import { ParseKeys } from 'i18next'
import { LangVariants, ThemeVariants } from '@/shared/types'

export type ThemesOptions = {
  name: ParseKeys
  value: ThemeVariants
}[]

export type UserSettingsViewProps = {
  defaultTheme: ThemeVariants
  defaultLang: LangVariants
}

export type UserSettingsNotificationsProps = {
  defaultNewRelease: boolean
  defaultNewComment: boolean
  defaultNewLike: boolean
  defaultNewRepost: boolean
  defaultNewSubs: boolean
}

export type UserSettingsSecurityProps = {
  password: boolean
}

export type UserSettingsPrivacyProps = {
  defaultProfile: boolean
  defaultSubscribers: boolean
  defaultLibrary: boolean
}
