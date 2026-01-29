import { Route, Routes } from 'react-router'

import { routes } from '@/shared/config'
import { SignUpPage, SignInPage } from '@/pages'

export const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<></>}
      />
      <Route
        path={routes.signUp}
        element={<SignUpPage />}
      />
      <Route
        path={routes.signIn}
        element={<SignInPage />}
      />
    </Routes>
  )
}
