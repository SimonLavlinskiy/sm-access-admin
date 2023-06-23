import React from 'react'
import { Edit } from 'react-admin'
import FormDevice from './FormDevice'
import { configureDataBeforeRecord } from './utils/utils'
import { useAtomValue } from 'jotai'
import { carImagesAtom } from './utils/utils'

const EditDevice = (props: any) => {

  return (
    <Edit
      {...props}
      title='Редактирование машины'
      undoable={false}
      mutationMode='pessimistic'
      redirect='show'
    >
      <FormDevice {...props} isEdit={true} />
    </Edit>
  )
}

export default EditDevice
