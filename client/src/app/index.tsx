import { AppLayout } from '@/layouts'

import { Provirdes } from './Providers'
import { Router } from './Router'

import './styles/index.scss'

export const App = () => {
  return (
    <Provirdes>
      <AppLayout>
        <Router />
      </AppLayout>
    </Provirdes>
  )
}
