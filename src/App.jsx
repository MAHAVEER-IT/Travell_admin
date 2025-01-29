import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AdminLayout from './components/Layout/AdminLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import DestinationList from './pages/Destinations/DestinationList'
import BookingList from './pages/Bookings/BookingList'
import UserList from './pages/Users/UserList'
import Login from './pages/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/admin.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="destinations" element={<DestinationList />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="users" element={<UserList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
