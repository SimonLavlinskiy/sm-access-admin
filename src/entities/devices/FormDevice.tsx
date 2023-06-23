import { useEffect, useState } from 'react'
import {
  TextInput,
  NumberInput,
  SelectInput,
  DateInput,
  SimpleForm,
  maxLength,
  minLength,
  DeleteWithConfirmButton,
  Toolbar,
  SaveButton,
  useRecordContext,
  required,
} from 'react-admin'
import {
  driveTypeOptions,
  ecoTypeOptions,
  fuelTypeOptions,
  transmissionTypeOptions,
  typeOptions,
  warrantyTypeOptions,
} from './form-select-options'
import { setAtomFromRecord } from '@/utils'
import { useSetAtom, useAtomValue } from 'jotai'
import { carImagesAtom } from './utils/utils'


const FormDevice = (props: any) => {
  const record = useRecordContext()


  return (
    <SimpleForm {...props} label='Создания устройства' toolbar={<EditToolbar />}>
     
    <TextInput fullWidth source='name' label='Название устройства' />
    <TextInput fullWidth source='imei' label='IMEI' />
    </SimpleForm>
  )
}

const EditToolbar = (props: any) => {
  const record = useRecordContext()
  return (
    <Toolbar {...props}>
    <SaveButton/>
      {record && (
        <DeleteWithConfirmButton
          confirmContent='Вы уверены? Это действие нелья отменить!'
          translateOptions={{ name: record?.name }}
        />
      )}
    </Toolbar>
  )
}

export default FormDevice
