import { useNavigate } from 'react-router-dom'
import './Layout.css'

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login')
  }

  return (
    <header className="admin-header">
      <div className="header-brand">
        <h1>NextStop Admin</h1>
      </div>
      <div className="header-actions">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header 