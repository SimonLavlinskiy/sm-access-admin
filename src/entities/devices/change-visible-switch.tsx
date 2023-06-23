import { FormControlLabel, Switch } from '@mui/material'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useNotify } from 'react-admin'
import { useMutation } from 'react-query'
import { setVisible } from './utils/cars-requests'
import { STOCK_SINGLE_UPDATE_PRIMARY_KEY } from './utils/constants'

export interface ChangeVisibleSwitchProps {
  carId: number
  visible: boolean
  disabled: boolean
}

export const ChangeVisibleSwitch: FC<ChangeVisibleSwitchProps> = ({ visible, carId, disabled }) => {
  const notify = useNotify()
  const [isVisible, setIsVisible] = useState(visible)

  const { mutate, data, isLoading } = useMutation({
    mutationKey: STOCK_SINGLE_UPDATE_PRIMARY_KEY,
    mutationFn: setVisible,
    onSuccess: data => {
      setIsVisible(prev => !prev)
      notify(data.data.visible ? 'Автомобиль отображается в каталоге.' : 'Автомобиль скрыт из каталога.', {
        type: 'success',
      })
    },
    onError: err => {
      const error = err as AxiosError<any, any>
      notify(
        error?.response?.data?.detail ||
          'На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, скоро это будет исправлено',
        { type: 'error' }
      )
    },
  })
  return (
    <FormControlLabel
      label={data?.data?.visible || visible ? 'В продаже' : 'Скрыт из продажи'}
      control={<Switch disabled={isLoading || disabled} checked={isVisible} onChange={() => mutate(carId)} />}
    />
  )
}
