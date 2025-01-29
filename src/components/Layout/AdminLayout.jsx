import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './Layout.css'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout 