import { AppLayout } from '@/layouts'

import { Provirdes } from './Providers'
import { Router } from './Router'

import './styles/index.scss'
import './i18n'

export const App = () => {
  return (
    <Provirdes>
      <AppLayout>
        <Router />
      </AppLayout>
    </Provirdes>
  )
}
