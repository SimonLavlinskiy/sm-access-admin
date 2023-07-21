import {
  TextInput,
  SimpleForm,
  DeleteWithConfirmButton,
  Toolbar,
  SaveButton,
  useRecordContext,
} from 'react-admin'


const FormDevice = (props: any) => {
  return (
    <SimpleForm {...props} label='Создания устройства' toolbar={<EditToolbar />}>
      <TextInput fullWidth name='name' source='name' label='Название устройства'/>
      <TextInput fullWidth name='imei' source='imei' label='IMEI'/>
      <TextInput fullWidth name='os_version' source='os_version' label='Версия ОС' />
      <TextInput fullWidth name='type' source='type' label='Тип'/>
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
