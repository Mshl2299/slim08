import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import './Layout.css'
import '../../styles/content-theme.css'

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
