import { AxiosRequestConfig } from 'axios'
import { USER_CURRENT, ROLE_ADMIN, ROLE_AUTO_ADMIN } from './constants'
import { httpClient } from '@/shared/lib'
import { User } from './types'
import { getRole, logoutViewer, setupStorage } from './viewer-utils'

export async function getCurrentViewer() {
  try {
    const current = await httpClient<User, AxiosRequestConfig>({
      url: USER_CURRENT,
    })
    const userRole = getRole(current.data.roles)
    if (userRole !== ROLE_ADMIN && userRole !== ROLE_AUTO_ADMIN) {
      logoutViewer()
      return Promise.reject({ message: 'Ошибка доступа' })
    }
    setupStorage(current.data)
    return current
  } catch (err) {
    return err
  }
}
