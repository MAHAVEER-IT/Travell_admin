import { useState, useEffect } from 'react'
import { formatDate } from '../../utils/formatDate'
import { bookingService } from '../../services/bookingService'
import './Bookings.css'

function BookingList() {
  const [bookings, setBookings] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true)
      const data = await bookingService.getAllBookings()
      setBookings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Update booking status
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingService.updateBookingStatus(bookingId, newStatus)
      // Refresh bookings list
      fetchBookings()
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return

    try {
      await bookingService.deleteBooking(bookingId)
      // Refresh bookings list
      fetchBookings()
    } catch (err) {
      setError(err.message)
    }
  }

  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' ? true : booking.status === filterStatus
  )

  useEffect(() => {
    fetchBookings()
  }, [])

  if (loading) return <div className="loading">Loading bookings...</div>

  return (
    <div className="bookings">
      <div className="page-header">
        <h2>Manage Bookings</h2>
        <div className="filters">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Destination</th>
              <th>Dates</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking._id.slice(-6)}</td>
                <td>{booking.user.name}</td>
                <td>{booking.destination.name}</td>
                <td>
                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                </td>
                <td>${booking.totalPrice}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="actions">
                  {booking.status === 'pending' && (
                    <button
                      className="confirm-btn"
                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                    >
                      Confirm
                    </button>
                  )}
                  {booking.status !== 'cancelled' && (
                    <button
                      className="cancel-btn"
                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingList 