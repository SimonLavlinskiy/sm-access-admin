import { FC } from 'react'
import {
  Datagrid,
  TextField,
  FunctionField,
  ShowButton,
  EditButton,
  DeleteWithConfirmButton,
  CreateButton,
  List,
  FilterButton,
  FilterForm,
  TextInput,
} from 'react-admin'
import { Stack } from '@mui/material'
import { Device } from './utils/types'
import React from 'react'



const RowActionToolbar: FC<{ record: Device }> = ({ record }) => {
  return (
    <div className='flex items-center float-right w-[160px] mt-[-1] mb-[-1] mr-5'>
      <ShowButton label='' record={record} className='min-w-[40px]' />
      <EditButton label='' record={record} className='min-w-[40px]' />
      <DeleteWithConfirmButton
        confirmContent='Вы уверены? Это действие нелья отменить!'
        translateOptions={{ name: record?.name }}
        label=''
        record={record}
        className='flex'
      />
    </div>
  )
}

const ListToolbar = () => {
  return (
    <Stack direction='row' justifyContent='space-between '>
      <FilterForm filters={postFilters} />
      <div className='flex mr-large'>
        <FilterButton filters={postFilters} />
        <CreateButton />
      </div>
    </Stack>
  )
}

const postFilters = [
  <TextInput label="Search" source="name" alwaysOn name='name'/>,
  <TextInput label="Id" source="id" name='id'/>,
];


const ListDevice = (props: any) => {
  return (
    <List exporter={false} hasCreate={false}>
      <ListToolbar />
      <Datagrid style={{ overflow: 'device' }}>
        <TextField source='id' label='ID' />
        <TextField source='name' label='Название' />
        <TextField source='imei' label='IMEI' />
        <TextField source='serial_number' label='Серийный номер' />
        <TextField source='product_name' label='Производитель' />
        <TextField source='type' label='Тип' />
        <TextField source='os_version' label='Версия ОС' />
        <TextField source='created_at' label='Дата создания' />
        <TextField source='updated_at' label='Дата обновления' />
        <FunctionField label='' render={(record: Device) => <RowActionToolbar record={record} />} />
      </Datagrid>
    </List>
  )
}

export default ListDevice
