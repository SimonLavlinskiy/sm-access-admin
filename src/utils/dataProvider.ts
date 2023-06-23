import { stringify } from 'query-string'
import { DataProvider, fetchUtils } from 'ra-core'
import { AxiosResponse, AxiosError } from 'axios'
import { TARGET } from './constants'
import { httpClient } from '@/shared/lib'

export const dataProvider = {
  getList: async (resource: string, params: any) => {
    const { page, perPage } = params?.pagination || { perPage: 20, page: 1 }

    const query = {
      per: perPage,
      page: page, 
    }

    const url = `${TARGET}/${resource}?${stringify(query || '')}`
    try {
      const response = (await httpClient({ url: url })) as AxiosResponse
      return Promise.resolve({
        data: response.data['devices'],
        total: response.data.totalItems,
      })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  getOne: async (resource: string, params: any) => {
    try {
      const response = (await httpClient({
        url: `${TARGET}/${resource}/${params?.id}`,
      })) as AxiosResponse
      return Promise.resolve({ data: response.data.device })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  getMany: async (resource: string, params: any) => {
    const items = []
    try {
      for (const id of params.ids) {
        const url = id.id ? `${TARGET}/${resource}/${id.id}` : `${TARGET}/${resource}/${id}`
        const response = (await httpClient({ url })) as AxiosResponse
        items.push(response.data)
      }

      return Promise.resolve({ data: items })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  getManyReference: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination

    const query = {
      ...fetchUtils.flattenObject(params.filter),
      page: page,
      limit: perPage,
    }
    const url = `${TARGET}/${resource}/?${stringify(query)}`
    try {
      const response = (await httpClient({ url })) as AxiosResponse
      return Promise.resolve({
        data: response.data.items,
        total: response.data.totalItems,
      })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  update: async (resource: string, params: any) => {

    console.log(params)

    try {
      const response = (await httpClient({
        url: `${TARGET}/${resource}/${params.id}`,
        method: 'PUT',
        data: params.data,
      })) as AxiosResponse
      if (response?.request?.status === 500) {
        return Promise.reject({ message: response.request.data.detail })
      }
      console.log(response)
      return Promise.resolve({
        data: response.data})
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  updateMany: async (resource: string, params: any) => {
    try {
      const responses = await Promise.all(
        params.ids.map((id: number) =>
          httpClient({
            url: `${TARGET}/${resource}/${id}`,
            method: 'PUT',
            data: params.data,
          })
        )
      )
      return Promise.resolve({ data: responses.map(({ data }) => data.id) })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  create: async (resource: string, params: any) => {
    const formatedResource = resource === 'autos' ? `${resource}/create` : resource
    try {
      const response = (await httpClient({
        url: `${TARGET}/${formatedResource}`,
        method: 'POST',
        data: params.data,
      })) as AxiosResponse
      if (response instanceof Error) {
        response.message = response.request.detail
        return Promise.reject(response)
      }
      return Promise.resolve({
        data: {
          ...params.data,
          id: response.data?.id,
          error: response.data.error ? response.data.error : null,
        },
      })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  delete: async (resource: string, params: any) => {
    try {
      const response = (await httpClient({
        url: `${TARGET}/${resource}/${params.id}`,
        method: 'DELETE',
      })) as AxiosResponse
      return Promise.resolve({ data: response.data })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },

  deleteMany: async (resource: string, params: any) => {
    try {
      await Promise.all(
        params.ids.map(
          async (id: number) =>
            await httpClient({
              url: `${TARGET}/${resource}/${id}`,
              method: 'DELETE',
            })
        )
      )
      return Promise.resolve({ data: [{ ids: params.ids }] })
    } catch (err) {
      const error = err as AxiosError<any>
      return Promise.reject({
        logoutUser: false,
        ...error,
        ...getErrorMessage(error),
      })
    }
  },
} as DataProvider

export function getErrorMessage(errorObj: AxiosError<any> | string) {
  const message =
    typeof errorObj === 'string'
      ? errorObj
      : errorObj.status === 500
      ? 'Ошибка сервера'
      : errorObj?.response?.data?.detail || errorObj?.response?.data?.message
  return {
    message,
  }
}
