import {
    SimpleForm,
    TextInput,
} from "react-admin";

const FormUser = (props: any) => {
    return (
        <SimpleForm {...props} label='Создания устройства'>
            <TextInput fullWidth name='username' source='name' label='Имя пользователя'/>
             {
                 !props.isEdit && <TextInput fullWidth name='plainPassword' source='plain_password' label='Пароль'/>
             }
        </SimpleForm>
    )
}

export default FormUser