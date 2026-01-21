import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

import { ThemeProvider } from './ThemeProvider'
import { ApiProvider } from './ApiProvider'
import { LangProvider } from './LangProvider'

export const Provirdes = ({ children }: { children: ReactNode }) => {
  return (
    <ApiProvider>
      <LangProvider>
        <ThemeProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </LangProvider>
    </ApiProvider>
  )
}
