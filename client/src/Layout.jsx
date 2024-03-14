
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='px-4 py-8 flex flex-col min-h-screen'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
