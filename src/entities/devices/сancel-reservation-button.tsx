import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useNotify, Button, useRefresh, useRecordContext } from 'react-admin'
import { useMutation } from 'react-query'
import { cancelReservation } from './utils/cars-requests'
import { CAR_SINGLE_PRIMARY_KEY } from './utils/constants'
import { Car } from './utils/types'
import { AxiosErrorObj } from '@/shared/@types'

export const CancelReservationButton: FC = () => {
  const record: Car = useRecordContext()

  const notify = useNotify()

  const refresh = useRefresh()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  const onOpen = () => setIsModalOpen(true)

  const { mutate, isLoading } = useMutation({
    mutationKey: CAR_SINGLE_PRIMARY_KEY,
    mutationFn: cancelReservation,
    onSuccess: () => {
      notify('Бронирование успешно отменено', {
        type: 'success',
      })
      onClose()
      refresh()
    },
    onError: err => {
      const error = err as AxiosError<AxiosErrorObj>
      notify(
        error?.response?.data?.detail ||
          'На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, скоро это будет исправлено',
        { type: 'error' }
      )
    },
  })

  if (!record.booked) return null

  return (
    <div>
      <Button variant='outlined' label='Отменить бронь' onClick={onOpen} />
      <Dialog open={isModalOpen} onClose={onClose}>
        <DialogContent>
          <DialogTitle>Вы точно хотите отменить бронирование?</DialogTitle>
          <DialogActions className='flex justify-center'>
            <Button label='Да' onClick={() => mutate(record?.id)} disabled={isLoading} />
            <Button label='Нет' variant='contained' onClick={onClose} />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}
