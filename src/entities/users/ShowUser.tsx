import { Show, SimpleShowLayout, TextField} from 'react-admin'

const ShowUser = () => {
    const emptyText = 'Пусто'
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source='id' label='ID' emptyText={emptyText} />
                <TextField source='username' label='Имя пользователя' emptyText={emptyText} />
            </SimpleShowLayout>
        </Show>
    )
}

export default ShowUser
