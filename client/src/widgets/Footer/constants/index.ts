import { routes } from '@/shared/config'
import TgIcon from '@/shared/assets/svg/tg.svg?react'
import VkIcon from '@/shared/assets/svg/vk.svg?react'
import GitHubIcon from '@/shared/assets/svg/gitHub.svg?react'

export const socials = [
  {
    Icon: TgIcon,
    href: 'https://t.me/sosa_aa',
  },
  {
    Icon: VkIcon,
    href: 'https://vk.com/so_saa',
  },
  {
    Icon: GitHubIcon,
    href: 'https://github.com/shest-ernev',
  },
] as const

export const authLinks = [
  {
    name: 'footer.authSignIn',
    to: routes.signIn,
  },
  {
    name: 'footer.authSignUp',
    to: routes.signUp,
  },
] as const

export const myLinks = [
  {
    name: 'footer.myProfile',
    to: routes.profile,
  },
  {
    name: 'footer.mySettings',
    to: routes.settings,
  },
  {
    name: 'footer.myNotifications',
    to: routes.notifications,
  },
] as const

export const generalLinks = [
  {
    name: 'footer.generalHome',
    to: routes.home,
  },
  {
    name: 'footer.generalSearch',
    to: routes.search,
  },
] as const

export const bottomLinks = [
  {
    name: 'footer.about',
    to: routes.about,
  },
  {
    name: 'footer.privacyPolicy',
    to: routes.privacyPolicy,
  },
  {
    name: 'footer.terms',
    to: routes.termsOfUse,
  },
] as const

export const themesOptions = [
  {
    name: 'userSettings.light',
    value: 'light',
  },
  {
    name: 'userSettings.dark',
    value: 'dark',
  },
] as const
