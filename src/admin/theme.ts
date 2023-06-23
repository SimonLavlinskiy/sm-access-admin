import { defaultTheme } from 'react-admin'

export const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    RaCreateButton: {
      styleOverrides: {
        root: {
          color: '#FF8A00',
        },
      },
    },
    RaUserMenu: {
      styleOverrides: {
        root: {
          color: '#FF8A00',
        },
      },
    },
    RaEditButton: {
      styleOverrides: {
        root: {
          color: '#FF8A00',
        },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#D4D3D3',
          },
        },
      },
    },
  },
}
