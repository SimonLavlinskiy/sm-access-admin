import { TARGET } from '@/utils'
import { AxiosResponse } from 'axios'
import { Car } from './types'
import { CAR_REQUEST_TARGET, STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET } from './constants'
import { getSingleRequestTarget, httpClient } from '@/shared/lib'

async function getItems(resourse: string, params: object) {
  try {
    const res = (await httpClient({
      url: `${TARGET}/${resourse}`,
      params: params,
    })) as AxiosResponse
    return res.data.items
  } catch (error) {
    throw new Error('Error fetching ' + resourse)
  }
}

export async function setVisible(carId: number) {
  const res = (await httpClient({
    url: `${TARGET}${getSingleRequestTarget(carId, STOCK_SINGLE_UPDATE_VISIBLE_REQUEST_TARGET)}`,
    method: 'PUT',
    data: {},
  })) as AxiosResponse<Car>
  return res
}

export const cancelReservation = async (carId: number) =>
  await httpClient<Car, { booked: boolean }>({
    url: getSingleRequestTarget(carId, CAR_REQUEST_TARGET),
    method: 'PUT',
    data: {
      booked: false,
    },
  })

export const carsRequests = {
  getBrands: async (params: object) => {
    return await getItems('brands', params)
  },
  getModels: async (params: object) => {
    return await getItems('models', params)
  },
  getCurrencies: async (params: object) => {
    return await getItems('currencies', params)
  },
  getConfigurations: async (params: object) => {
    return await getItems('configurations', params)
  },
  getUsers: async (params: object) => {
    return await getItems('users', params)
  },
  getAddresses: async (params: object) => {
    return await getItems('addresses', params)
  },
  getBodyTypes: async (params: object) => {
    return await getItems('body_types', params)
  },
  getColors: async (params: object) => {
    return await getItems('colors', params)
  },
}
