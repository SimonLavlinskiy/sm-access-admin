import { ChangeEvent, useState, useMemo, useEffect } from 'react'
import { FileAtom, RawFile, setDataImages, Image, UploadedFile, FileServer } from '@/utils'
import { useAtom } from 'jotai'
import { carImagesAtom } from './utils'
import { useNotify } from 'react-admin'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AxiosError } from 'axios'
import { Skeleton } from '@mui/material'
import { ALLOWED_IMAGES_MIMETYPE } from '@/shared/config'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import Filter1Icon from '@mui/icons-material/Filter1'
import { Tooltip } from '@/shared/ui'
import cn from 'classnames'
import { sortCarImagesByOrderId } from './utils'

type UploadedImagesWithError = {
  imagesArr: UploadedFile[]
  errorArr: UploadedFile[]
}

export function FileUploadMultiple({ images }: any) {
  const [carImages, setCarImages] = useAtom(carImagesAtom)
  const [errorImages, setErrorImages] = useState<UploadedFile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const notify = useNotify()

  useEffect(() => {
    if (!carImages) setCarImages(images)
  }, [images])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = (Array.from(e.target.files) as UploadedFile[]).reduce(
        (acc: UploadedImagesWithError, file: UploadedFile) => {
          if (file.size > 5000000 || !ALLOWED_IMAGES_MIMETYPE.includes(file.type)) {
            return { imagesArr: [...acc.imagesArr], errorArr: [...acc.errorArr, file] }
          }
          return { imagesArr: [...acc.imagesArr, file], errorArr: [...acc.errorArr] }
        },
        { imagesArr: [], errorArr: [] }
      )
      setCarImages([...(carImages || []), ...(images.imagesArr as UploadedFile[])])
      setErrorImages(images.errorArr)
    }
  }

  useEffect(() => {
    if (carImages?.find((image: Image) => !(image as FileAtom)?.fileToSubmit?.id)) handleUploadClick()
  }, [carImages])

  const handleUploadClick = async () => {
    if (!carImages) {
      return
    }
    setIsLoading(true)
    try {
      const res = await setDataImages(carImages)
      setCarImages(res as FileAtom[])
    } catch (error) {
      notify((error as AxiosError).message || 'Ошибка загрузки изображения, попробуйте снова', { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = (fileIndex: number) => {
    setCarImages((prev: Image[]) => prev.filter((_, i) => i != fileIndex))
  }

  const handleDeleteErrorImage = (fileIndex: number) => {
    setErrorImages((prev: UploadedFile[]) => prev.filter((_, i) => i != fileIndex))
  }

  const imageLabelMultipleText = useMemo(() => {
    if (carImages?.length > 29) return 'Больше 30ти фотографий запрещено'
    if (isLoading) return 'Изображение загружается... Подождите'
    if (!carImages?.length) return 'Hажмите для выбора.(максимальный размер файла 5мб)'
    return `Загружено ${carImages?.length} фото (допускается от 5 до 30 файлов, максимальный размер 5мб)`
  }, [isLoading, carImages])

  function getFileUrl(file: Image) {
    if ((file as FileAtom)?.localData || (file as RawFile)?.name) {
      const finalFile = (file as FileAtom).localData || file
      //@ts-expect-error
      return URL.createObjectURL(finalFile)
    }
    if ((file as FileAtom)?.serverData?.pathS3) return (file as FileAtom)?.serverData?.pathS3
    return
  }

  function getErrorFile(file: UploadedFile) {
    if (!ALLOWED_IMAGES_MIMETYPE.includes(file.type)) {
      return <div>{file.name}</div>
    }
    //@ts-expect-error
    return <img src={URL.createObjectURL(file)} alt='' width={100} />
  }

  function swapImages(firstSwapImageIndex: number) {
    function getElWithNewOrderIndex(image: Image, iterator: number): Image {
      if ((image as FileAtom)?.serverData?.orderIndex) {
        return {
          ...image,
          serverData: {
            ...(image as FileAtom).serverData,
            //@ts-expect-error
            orderIndex: (image as FileAtom)?.serverData?.orderIndex + iterator,
          },
        } as FileAtom
      }
      if ((image as FileServer)?.orderIndex) {
        return {
          ...image,
          orderIndex: (image as FileServer).orderIndex + iterator,
        } as FileServer
      }
      return image
    }
    setCarImages((prev: Image[]) => {
      const res = [...prev]
      return res.map((el, curImageIndex) => {
        if (curImageIndex === firstSwapImageIndex) return getElWithNewOrderIndex(res[curImageIndex + 1], -1)
        if (curImageIndex === firstSwapImageIndex + 1) return getElWithNewOrderIndex(res[curImageIndex - 1], 1)
        return el
      })
    })
  }

  function makePreview(imageIndex: number) {
    function getElWithNewOrderIndex(image: Image, iterator?: number): Image {
      if ((image as FileAtom).serverData?.orderIndex) {
        return {
          ...image,
          serverData: {
            ...(image as FileAtom).serverData,
            //@ts-expect-error
            orderIndex: iterator ? (image as FileAtom)?.serverData?.orderIndex + iterator : 1,
          },
        } as FileAtom
      }
      if ((image as FileServer).orderIndex) {
        return {
          ...image,
          orderIndex: iterator ? (image as FileServer).orderIndex + iterator : 1,
        } as FileServer
      }
      return image
    }
    setCarImages((prev: Image[]) => {
      const arr = [...prev]
      const newPreview = getElWithNewOrderIndex(arr[imageIndex])
      arr.splice(imageIndex, 1)
      const newArr = arr.map(image => {
        return getElWithNewOrderIndex(image, 1)
      })
      return [newPreview, ...newArr]
    })
  }

  return (
    <div className='my-large'>
      <input className='text-white' type='file' onChange={handleFileChange} multiple />
      <div>{imageLabelMultipleText}</div>
      {!isLoading ? (
        <ul className='mt-extra-small flex gap-large flex-wrap'>
          {sortCarImagesByOrderId(carImages)?.map((file: Image, i: number) => (
            <li key={i} className='relative list-none flex items-center'>
              <div className='flex'>
                <div
                  className={cn({
                    'border-4 border-red text-center': i === 0,
                  })}
                >
                  {i === 0 && <div>Основное</div>}
                  <img src={getFileUrl(file)} alt='' width={100} />
                </div>
                <div className='flex flex-col ml-1'>
                  <DeleteForeverIcon className='relative cursor-pointer' onClick={() => handleDeleteImage(i)} />
                  {i != 0 && (
                    <Tooltip label='Сделать фото основным'>
                      <Filter1Icon className='cursor-pointer' onClick={() => makePreview(i)} />
                    </Tooltip>
                  )}
                </div>
              </div>
              {i != carImages.length - 1 && <SwapHorizIcon className='cursor-pointer' onClick={() => swapImages(i)} />}
            </li>
          ))}
        </ul>
      ) : (
        <ImagesSkeleton />
      )}
      {!!errorImages.length && (
        <div>
          <div>Следующие изображние не подходят по типу файла или размеру. В машину они добавлены не будут!</div>
          <div className='mt-extra-small flex gap-large flex-wrap'>
            {errorImages?.map((file: UploadedFile, i: number) => (
              <li key={i} className='relative list-none flex gap-small'>
                {getErrorFile(file)}
                <DeleteForeverIcon className='errorDeleteIcon' onClick={() => handleDeleteErrorImage(i)} />
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploadMultiple

const ImagesSkeleton = () => {
  return (
    <div className='flex gap-[40px]'>
      {Array.from({ length: 5 }).map((el, i) => (
        <Skeleton key={i} width={100} height={100} />
      ))}
    </div>
  )
}
