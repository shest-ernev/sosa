import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'

import { ThemeProvider } from './ThemeProvider'
import { ApiProvider } from './ApiProvider'

export const Provirdes = ({ children }: { children: ReactNode }) => {
  return (
    <ApiProvider>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </ApiProvider>
  )
}
