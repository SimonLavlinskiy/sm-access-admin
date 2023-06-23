import { AxiosError, AxiosResponse } from 'axios'
import { TARGET } from './constants'
import { FileServer, FileLocal, FileAtom, Image, RawFile, UploadedFile } from './types'
import { SetStateAction } from 'jotai'
import { httpClient } from '@/shared/lib'
import { getErrorMessage } from './dataProvider'

export function setAtomFromRecord(images: Image[], setAtom: SetStateAction<any>) {
  return setAtom(
    images.map(image => {
      if ((image as FileServer).id) {
        return {
          fileToSubmit: {
            id: (image as FileServer).id,
            iri: `/files/${(image as FileServer).id}`,
          },
          serverData: image,
        }
      }
      if ((image as FileLocal).rawFile) {
        return {
          fileToSubmit: null,
          localData: image,
        }
      }
      return {
        fileToSubmit: image,
        serverData: image,
      }
    })
  )
}

/**
 * Если файл уже существует в записи (при редактировании, просто назначаем свойству image ссылку (IRI) на файл)
 * Если файл загружаем новый, то следует сначала отправить его на сервер, получив ссылку на него (IRI)
 */
export const setDataImages = async (images: Image[]) => {
  return Promise.all(
    images.map((image: Image) => {
      if ((image as FileAtom)?.fileToSubmit?.id) return Promise.resolve(image)
      if (!(image as FileAtom)?.fileToSubmit?.id && (image as FileAtom)?.localData) return Promise.resolve(image)
      if ((image as FileServer)?.pathS3) {
        const result = {
          fileToSubmit: {
            id: (image as FileServer)?.id,
            iri: `/files/${(image as FileServer)?.id}`,
          },
          serverData: image,
        }
        return Promise.resolve(result)
      }
      if ((image as RawFile)?.path || (image as FileLocal)?.rawFile || (image as UploadedFile).size) {
        return uploadFile(image as FileLocal).then((data?: FileServer) => {
          return Promise.resolve({
            fileToSubmit: data?.id && {
              id: data?.id,
              iri: `/files/${data?.id}`,
            },
            localData: image,
          }).catch(err => {
            const error = err as AxiosError<any>
            return Promise.reject({
              ...error,
              ...getErrorMessage(error),
            })
          })
        })
      }
      if (!image) return Promise.resolve()
    })
  )
}

export const uploadFile = async (file: FileLocal | RawFile) => {
  const fd = new FormData()
  //@ts-expect-error
  fd.append('file', (file as FileLocal).rawFile || (file as RawFile))

  try {
    const res = (await httpClient({
      url: `${TARGET}/files`,
      method: 'POST',
      data: fd,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })) as AxiosResponse
    return res.data as FileServer
  } catch (err) {
    const error = err as AxiosError<any>
    return Promise.reject({
      ...error,
      ...getErrorMessage(error),
    })
  }
}
