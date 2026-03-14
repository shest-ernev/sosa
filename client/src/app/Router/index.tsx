import { Route, Routes } from 'react-router'

import { routes } from '@/shared/config'
import {
  SignUpPage,
  SignInPage,
  SettingsPage,
  ChangePasswordPage,
  HomePage,
} from '@/pages'

export const Router = () => {
  return (
    <Routes>
      <Route
        index={true}
        element={<HomePage />}
      />
      <Route
        path={routes.signUp}
        element={<SignUpPage />}
      />
      <Route
        path={routes.signIn}
        element={<SignInPage />}
      />
      <Route
        path={routes.settings}
        element={<SettingsPage />}
      />
      <Route
        path={routes.changePassword}
        element={<ChangePasswordPage />}
      />
    </Routes>
  )
}
