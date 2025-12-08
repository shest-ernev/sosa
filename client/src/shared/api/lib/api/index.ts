import axios, { AxiosRequestConfig } from 'axios'

import { ls } from '@/shared/config'
import { ErrorResponse } from '@/shared/types/ErrorResponse'

export const api = axios.create({ baseURL: 'http://localhost:8001/api' })

api.interceptors.request.use((config) => {
  if (localStorage.getItem(ls.accessToken)) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      ls.accessToken
    )}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (err: ErrorResponse) => {
    try {
      const originalRequest = err.config as AxiosRequestConfig

      if (
        localStorage.getItem(ls.refreshToken) &&
        err.response?.data.message === 'Invalid access token'
      ) {
        const { data } = await api.get<{
          access_token: string
        }>(`/auth/refresh/${localStorage.getItem(ls.refreshToken)}`)

        localStorage.setItem(ls.accessToken, data.access_token)

        return api(originalRequest)
      }
    } catch (refreshError) {
      console.log('err', err)

      localStorage.removeItem(ls.accessToken)
      localStorage.removeItem(ls.refreshToken)

      window.location.reload()

      return Promise.reject(refreshError)
    }

    return Promise.reject(err)
  }
)
