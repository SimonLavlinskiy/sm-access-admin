import { Color } from './types'
import { atom } from 'jotai'
import { FileAtom, FileServer, uploadFile, FileLocal, Image, textRegEx } from '@/utils'
import { httpClient } from '@/shared/lib'
import { TARGET } from '@/utils'

//TODO добавить возможность проконтролировать, та ли машина
export const carImagesAtom = atom([] as FileAtom[] | any)
export const carFormButtonDisable = atom(false)

export type ObjectWithId = {
  id: number
}

//todo
export async function configureDataBeforeRecord(
  data: any,
  edit?: boolean,
) {
  return data
  
}