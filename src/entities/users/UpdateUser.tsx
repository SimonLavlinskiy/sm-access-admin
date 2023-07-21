import React from 'react'
import { Edit } from 'react-admin'
import FormUser from "@/entities/users/FormUser";

const UpdateUser = (props: any) => {
  return (
    <Edit
      {...props}
      title='Редактирование пользователя'
      undoable={false}
      mutationMode='pessimistic'
      redirect='show'
    >
      <FormUser {...props} isEdit={true} />
    </Edit>
  )
}

export default UpdateUser