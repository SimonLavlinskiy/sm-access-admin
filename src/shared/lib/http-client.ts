import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { destroyCookie } from 'nookies'
import { AxiosErrorObj } from '@/shared/@types'
import { TARGET, authRequest, setCookieTokens, logoutViewer, getCurrentViewer, getTokens } from '@/utils'

export interface RequestQueue {
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
  config: AxiosRequestConfig
}

const instance: AxiosInstance = axios.create({
  baseURL: TARGET,
})

instance.interceptors.request.use(requestInterceptor)

export const requestTokens = _.debounce(
  (refresh_token: string, requestQueue: RequestQueue[]) =>
    authRequest(refresh_token)
      .then(
        res => setCookieTokens(res.data),
        err => {
          const error = err as AxiosError<AxiosErrorObj>
          const message = error.response?.data?.message
          if (message === 'The refresh token is invalid.') {
            destroyCookie(null, 'refresh_token', { path: '/' })
            logoutViewer()
            window.history.pushState(null, '', '/admin#/login')
            window.location.reload()
            return Promise.reject({ message })
          }
          return Promise.resolve()
        }
      )
      .then(async () => await getCurrentViewer())
      .then(() =>
        Promise.allSettled(
          requestQueue.map(({ config, reject, resolve }) => httpClient(config).then(resolve).catch(reject))
        )
      )
      .finally(() => {
        const href = window.location.href
        const urlCreate = href.includes('create')
        const urlShow = href.includes('show')
        if (!urlCreate && !urlShow) window.location.reload()
      }),
  300
)

async function requestInterceptor(config: InternalAxiosRequestConfig) {
  const access_token = getTokens()?.access_token

  // eslint-disable-next-line
  ;(config as AxiosRequestConfig).headers = {
    Accept: 'application/json',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
    ...config.headers,
    'Origin':'http://localhost:3000'
  }

  if (access_token) config.headers.Authorization = `Bearer ${access_token}`

  return config
}

export const httpClient = <T, D = undefined>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> =>
  instance(config)
