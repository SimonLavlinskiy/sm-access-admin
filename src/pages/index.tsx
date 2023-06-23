import Head from 'next/head'
import { NextPageWithLayout } from '@/shared/@types'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../admin/App'), { ssr: false })

const Home: NextPageWithLayout = () => (
  <div>
    <Head>
      <title>Sm-access admin</title>
      <meta name='description' content='Sm-access admin panel' />
    </Head>
    <App />
  </div>
)

export default Home
