import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

import { ThemeProvider } from './ThemeProvider'
import { ApiProvider } from './ApiProvider'
import { LangProvider } from './LangProvider'
import { AuthProvider } from './AuthProvider'

export const Provirdes = ({ children }: { children: ReactNode }) => {
  return (
    <ApiProvider>
      <LangProvider>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </LangProvider>
    </ApiProvider>
  )
}
