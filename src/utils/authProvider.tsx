import { AxiosBasicCredentials, AxiosError } from 'axios'
import { getCurrentViewer } from './getCurrentViewer'
import { authRequest, AUTH_REQUEST_TARGET } from './authRequest'
import { getTokens, logoutViewer, setCookieTokens } from './viewer-utils'
import { AuthProvider } from 'react-admin'
import { destroyCookie } from 'nookies'
import { RequestQueue, requestTokens } from '@/shared/lib'
import { getErrorMessage } from './dataProvider'

let requestQueue: RequestQueue[] = []

export const authProvider = {
  async login({ username, password }: AxiosBasicCredentials) {
    return await authRequest({ data: { username, password } })
      .then(async res => {
        setCookieTokens(res.data)
        await getCurrentViewer()
      })
      .catch(err => Promise.reject({ ...err, ...getErrorMessage(err) }))
  },
  async checkAuth() {
    return getTokens().refresh_token ? Promise.resolve() : Promise.reject()
  },
  async checkError(error: AxiosError<any>) {
    const { refresh_token } = getTokens()
    if (error.response?.status === 401) {
      if (refresh_token) {
        if (!error.config?.url?.includes(AUTH_REQUEST_TARGET))
          new Promise((resolve, reject) => requestQueue.push({ resolve, reject, config: error.config! }))
        destroyCookie(null, 'access_token', { path: '/' })
        await requestTokens(refresh_token, requestQueue)
        requestQueue = []
        return Promise.resolve()
      } else return Promise.reject({ ...error, logoutUser: true })
    }
    return Promise.resolve()
  },
  async getIdentity() {
    try {
      const res = await getCurrentViewer()
      return Promise.resolve(res)
    } catch (err) {
      const error = err as AxiosError<any>
      if (error.request.status === 400) throw new Error('Ошибка после авторизации')
      return Promise.reject({
        ...error,
        ...getErrorMessage(error),
      })
    }
  },
  getPermissions() {
    const role = localStorage.getItem('ROLE')
    return role ? Promise.resolve(role) : Promise.reject({ message: 'Role not found' })
  },
  logout() {
    logoutViewer()
    return Promise.resolve()
  },
} as AuthProvider
