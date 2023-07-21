import { Create } from 'react-admin'
import FormUser from "@/entities/users/FormUser";

const CreateUser = (props: any) => {
    return (
        <Create
            {...props}
            title='Создание пользователя'
        >
            <FormUser {...props}/>
        </Create>
    )
}

export default CreateUser
