import { Provirdes } from './Providers'
import { Router } from './Router'
import { Layout } from './Layout'

import '@/shared/i18n'
import './styles/index.scss'

export const App = () => {
  return (
    <Provirdes>
      <Layout>
        <Router />
      </Layout>
    </Provirdes>
  )
}
