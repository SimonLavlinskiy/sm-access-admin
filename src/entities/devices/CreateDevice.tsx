import { Create } from 'react-admin'
import FormDevice from './FormDevice'
import { useRecordContext } from 'react-admin'


const CreateDevice = (props: any) => {
  return (
    <Create
      {...props}
      title='Создание машины'
      >
      <FormDevice {...props}/>
    </Create>
  )
}

export default CreateDevice
