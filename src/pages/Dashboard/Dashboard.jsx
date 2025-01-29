import { useState, useEffect } from 'react'
import { getDestinations, getUsers, getBookings } from '../../services/api'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalDestinations: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      const [destinations, users, bookings] = await Promise.all([
        getDestinations(),
        getUsers(),
        getBookings()
      ])

      setStats({
        totalBookings: bookings.length,
        totalUsers: users.length,
        totalDestinations: destinations.length
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      setError('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Destinations</h3>
          <p>{stats.totalDestinations}</p>
        </div>
      </div>

    </div>
  )
}

export default Dashboard 