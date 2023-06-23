import { useDataProvider, useRefresh, useUnselectAll, Button, useNotify } from 'react-admin'
import DeleteIcon from '@mui/icons-material/Delete'
import { AxiosError } from 'axios'

export const ListBulkActions = (props: any) => {
  const { selectedIds, resource } = props
  const dataProvider = useDataProvider()
  const refresh = useRefresh()
  const notify = useNotify()
  const unselectAll = useUnselectAll(resource)
  const buttonColor = { color: '#f44336' }

  const handleDelete = async () => {
    try {
      await dataProvider.deleteMany(resource, { ids: selectedIds })
      refresh()
      unselectAll()
      return Promise.resolve()
    } catch (err) {
      notify((err as AxiosError).message, { type: 'error' })
      return Promise.reject(err)
    }
  }

  return (
    <Button onClick={() => handleDelete()}>
      <DeleteIcon style={buttonColor} />
    </Button>
  )
}
