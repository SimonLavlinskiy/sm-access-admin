import { Show, SimpleShowLayout, TextField} from 'react-admin'


const ShowDevice = (props: any) => {
  const emptyText = 'Пусто'
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source='id' label='ID' emptyText={emptyText} />
        <TextField source='name' label='Название устройства' emptyText={emptyText} />
        <TextField source='imei' label='IMEI' emptyText={emptyText} />
      </SimpleShowLayout>
    </Show>
  )
}

export default ShowDevice
