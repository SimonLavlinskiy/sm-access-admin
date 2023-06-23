import { Admin, Resource, Layout, AppBar, LayoutProps } from 'react-admin'
import { dataProvider, authProvider } from '@/utils'
import { QueryClientProvider, QueryClient } from 'react-query'
import Box from '@mui/material/Box'
import { theme } from '@/admin/theme'
import i18nProvider from '@/admin/i18n'
import { PROJECT_VERSION } from '@/shared/config'
import ListDevice from '@/entities/devices/ListDevice'
import CreateDevice from '@/entities/devices/CreateDevice'
import EditDevice from '@/entities/devices/EditDevice'
import ShowDevice from '@/entities/devices/ShowDevice'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Admin
        dataProvider={dataProvider}
 //       authProvider={authProvider}
        theme={theme}
        requireAuth
        layout={MyLayout}
        title='Sm-access Admin'
        i18nProvider={i18nProvider}
      >
        <Resource
          name='devices'
          options={{ label: 'Устройства' }}
          list={ListDevice}
          create={CreateDevice}
          edit={EditDevice}
          show={ShowDevice}
          icon={PhoneAndroidIcon}
        />
      </Admin>
    </QueryClientProvider>
  )
}

const MyLayout = (props: LayoutProps) => <Layout {...props}/>
const MyAppBar = () => (
  <AppBar>
    <Box flex={1} />
    <Box flex={1} />
    <div>v-{PROJECT_VERSION}</div>
  </AppBar>
)

export default App
