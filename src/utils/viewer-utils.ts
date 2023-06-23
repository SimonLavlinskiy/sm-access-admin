import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ResponseAuth } from './authRequest'
import { ROLE_ADMIN, ROLE_DEALER, ROLE_USER, ROLE_DEFAULT, ROLE_AUTO_ADMIN } from './constants'
import { Roles, User } from './types'

export const getTokens = () => {
  const { access_token, refresh_token } = parseCookies()
  return { access_token, refresh_token }
}

export const setCookieTokens = (data: ResponseAuth) => {
  setCookie(null, 'access_token', data.access_token, { path: '/', maxAge: data.expires_in })
  setCookie(null, 'refresh_token', data.refresh_token, { path: '/', maxAge: 2592000 })
}

export const logoutViewer = () => {
  localStorage.clear()
  destroyCookie(null, 'access_token', { path: '/' })
  destroyCookie(null, 'refresh_token', { path: '/' })
}

export function setupStorage(current: User) {
  localStorage.setItem('username', current.fullName || current.username)
  current?.roles && localStorage.setItem('ROLE', getRole(current.roles))
  localStorage.setItem('userId', String(current.id))
}

export function getRole(roles: Roles[]) {
  if (roles?.includes(ROLE_AUTO_ADMIN)) {
    return ROLE_AUTO_ADMIN
  }
  if (roles?.includes(ROLE_ADMIN)) {
    return ROLE_ADMIN
  }
  if (roles?.includes(ROLE_DEALER)) {
    return ROLE_DEALER
  }
  if (roles?.includes(ROLE_USER)) {
    return ROLE_USER
  }
  return ROLE_DEFAULT
}
