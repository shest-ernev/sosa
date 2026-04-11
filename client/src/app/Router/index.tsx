import { Route, Routes } from 'react-router'

import { routes } from '@/shared/config'
import {
  ChangePasswordPage,
  HomePage,
  PrivacyPolicyPage,
  SignInPage,
  SignUpPage,
  SettingsPage,
  DeletePasswordPage,
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
      <Route
        path={routes.privacyPolicy}
        element={<PrivacyPolicyPage />}
      />
      <Route
        path={routes.deletePassword}
        element={<DeletePasswordPage />}
      />
    </Routes>
  )
}
