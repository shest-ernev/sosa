import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router'

import { Button, Text, Select } from '@/shared/ui'
import { langs } from '@/shared/config'
import { useStore } from '@/shared/hooks'
import { LangVariants, ThemeVariants } from '@/shared/types'

import {
  socials,
  authLinks,
  myLinks,
  securityLinks,
  generalLinks,
  bottomLinks,
  themesOptions,
} from '../constants'
import styles from '../styles/index.module.scss'

export const Footer = observer(() => {
  const { auth, lang, theme } = useStore()
  const { t } = useTranslation()

  const handleEditLang = (v: LangVariants) => {
    lang.setLang(v)
  }

  const handleEditTheme = (v: ThemeVariants) => {
    theme.setTheme(v)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.separator} />
      <div className={styles.section}>
        {!auth.isAuth && (
          <>
            <div className={styles.links}>
              <Text
                color='primary'
                weight={700}
              >
                {t('footer.view')}
              </Text>
              <Select.Root
                value={lang.activeLang}
                onValueChange={handleEditLang}
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
              <Select.Root
                value={theme.activeTheme}
                onValueChange={handleEditTheme}
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
                      key={obj.name}
                    >
                      {t(obj.name)}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          </>
        )}
        <div className={styles.links}>
          <Text
            color='primary'
            weight={700}
          >
            {auth.isAuth ? t('footer.myTitle') : t('footer.authTitle')}
          </Text>
          {(auth.isAuth ? myLinks : authLinks).map((obj, index) => (
            <Text key={index}>
              <Link
                to={obj.to}
                className={styles.link}
              >
                {t(obj.name)}
              </Link>
            </Text>
          ))}
        </div>
        <div className={styles.links}>
          <Text
            color='primary'
            weight={700}
          >
            {t('footer.security')}
          </Text>
          {securityLinks.map((obj, index) => (
            <Text key={index}>
              <Link
                to={obj.to}
                className={styles.link}
              >
                {t(obj.name)}
              </Link>
            </Text>
          ))}
        </div>
        <div className={styles.links}>
          <Text
            color='primary'
            weight={700}
          >
            {t('footer.general')}
          </Text>
          {generalLinks.map((obj, index) => (
            <Text key={index}>
              <Link
                to={obj.to}
                className={styles.link}
              >
                {t(obj.name)}
              </Link>
            </Text>
          ))}
        </div>
        <div className={styles.social}>
          {socials.map((obj, index) => {
            const Icon = obj.Icon

            return (
              <Button
                key={index}
                className={styles.socialBtn}
                color='primary'
                variant='text'
                asChild={true}
              >
                <a
                  href={obj.href}
                  target='_blank'
                >
                  <Icon />
                </a>
              </Button>
            )
          })}
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.section}>
        <div className={styles.left}>
          {bottomLinks.map((obj, index) => (
            <Text key={index}>
              <Link
                to={obj.to}
                className={styles.link}
              >
                {t(obj.name)}
              </Link>
            </Text>
          ))}
        </div>
        <Text>&copy;&nbsp;{new Date().getFullYear()} Sosa</Text>
      </div>
    </footer>
  )
})
