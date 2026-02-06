import axios, { AxiosRequestConfig } from 'axios'

import { ls, server } from '@/shared/config'
import { MessageResponse, components } from '@/shared/types'

export const client = axios.create({ baseURL: server.base })

client.interceptors.request.use((config) => {
  if (localStorage.getItem(ls.accessToken)) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      ls.accessToken,
    )}`
  }

  return config
})

client.interceptors.response.use(
  (response) => response,
  async (err: MessageResponse) => {
    try {
      const originalRequest = err.config as AxiosRequestConfig

      if (
        localStorage.getItem(ls.refreshToken) &&
        err.response?.data.message === 'Invalid access token'
      ) {
        const { data } = await client.get<
          components['schemas']['AuthRefreshData']
        >(`/auth/refresh/${localStorage.getItem(ls.refreshToken)}`)

        localStorage.setItem(ls.accessToken, data.access_token)

        return client(originalRequest)
      }
    } catch (refreshError) {
      console.log('err', err)

      localStorage.removeItem(ls.accessToken)
      localStorage.removeItem(ls.refreshToken)

      window.location.reload()

      return Promise.reject(refreshError)
    }

    return Promise.reject(err)
  },
)
