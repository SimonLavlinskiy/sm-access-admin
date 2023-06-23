import { ROLE_ADMIN, ROLE_DEALER, ROLE_USER, ROLE_DEFAULT, ROLE_AUTO_ADMIN } from './constants'

export type FileServer = {
  pathS3: string
  id: number
  orderIndex: number
}

export type RawFile = {
  path: string
  name: string
}

export type UploadedFile = {
  lastModified: number
  name: string
  size: number
  type: string
}

export type FileLocal = {
  src: string
  title: string
  rawFile: RawFile
}

export type FileAtom = {
  fileToSubmit: {
    id: number
    iri: string
  }
  serverData?: FileServer
  localData?: FileLocal | RawFile
}

export type Image = FileServer | FileLocal | FileAtom | RawFile | UploadedFile
export interface AuthToken {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export type Roles =
  | typeof ROLE_ADMIN
  | typeof ROLE_DEALER
  | typeof ROLE_USER
  | typeof ROLE_DEFAULT
  | typeof ROLE_AUTO_ADMIN

export interface User {
  id: number
  isAgreementAccepted: boolean
  firstName: string
  lastName: string
  middleName: string
  fullName: string
  isRealEmail: boolean
  username: string
  enabled: boolean
  email: string
  roles: Roles[]
  phone: string
  isExternalUser: boolean
  isEmailConfirmed: boolean
  isPhoneConfirmed: boolean
  isTelegramConfirmed: boolean
  telegram: string
}

export type ObjectWithName = {
  name: string
  id?: string
  fullName?: string
}

export interface BaseEntity {
  id: number
  dateCreate: string
  dateUpdate: string
}

export type ImageLocal = {
  rawFile: RawFile
  src: string
  title: string
}

export type Nullable<T> = T | null
