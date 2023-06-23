import React, { useState } from 'react'
import { Button, SaveButton, Form, useNotify, FormProps } from 'react-admin'
import AddIcon from '@mui/icons-material/Add'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogProps } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { FCWithChildren } from '@/shared/@types'
import cn from 'classnames'
import { AxiosError } from 'axios'
import { httpClient } from '@/shared/lib'
import { TARGET } from '@/utils'
import { ObjectWithId } from '@/entities/devices/utils/utils'

export type Field = {
  source: string
  label?: string
  type?: 'number' | 'string' | 'boolean'
  required?: boolean
}

export interface QuickCreateButtonProps {
  header?: string
  resource: string
  formParams?: FormProps
  modalParams?: DialogProps
  formatDataBeforeCreate: (data: any) => Object | undefined
}

interface DataForm {
  name: string
  brand: number | ObjectWithId | string
}

export const QuickCreateForm: FCWithChildren<QuickCreateButtonProps> = ({
  header = 'Добавление',
  resource,
  className,
  children,
  formParams,
  modalParams,
  //TODO исправить типы данный, убрать факт того, что при сабмите в метод летит вся модель машины
  formatDataBeforeCreate = data => data,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const notify = useNotify()

  const onClose = () => setIsModalOpen(false)

  const onOpen = () => setIsModalOpen(true)

  const handleSubmit = async (data: Partial<DataForm>) => {
    setIsSubmiting(true)
    try {
      if (typeof data.brand === 'number') data.brand = `/brands/${data.brand}`
      await httpClient({
        method: 'POST',
        url: TARGET + '/' + resource,
        data: formatDataBeforeCreate(data),
      })
      setIsModalOpen(false)
      notify(`${header} прошло успешно`, { type: 'success' })
    } catch (error) {
      notify((error as AxiosError<any>).response?.data?.detail, { type: 'error' })
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <div className={cn(className, 'mt-[-20px]')}>
      <Button onClick={onOpen} label='ra.action.create'>
        <AddIcon />
      </Button>
      <Dialog {...modalParams} open={isModalOpen} onClose={onClose} aria-label={header}>
        <DialogTitle>{header}</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={handleSubmit}
            id={`post-quick-create-${resource}`}
            resource={resource}
            sanitizeEmptyValues
            {...formParams}
          >
            {children}
            <DialogActions>
              <SaveButton alwaysEnable form={`post-quick-create-${resource}`} disabled={isSubmiting} />
              <Button label='ra.action.cancel' onClick={onClose}>
                <CancelIcon />
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
