import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user || user.email !== 'admin@gmail.com') {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}

export default ProtectedRoute 