const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const bookingService = {
  // Get all bookings
  getAllBookings: async () => {
    try {
      const response = await fetch(`${API_URL}/bookings/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch bookings')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      })
      if (!response.ok) throw new Error('Failed to update booking status')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to delete booking')
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }
} 