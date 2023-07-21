import { BaseEntity } from '@/utils'

export interface Device extends BaseEntity {
  imei: string
  name: string
  serialNumber: string
  productName: string
  type: string
}