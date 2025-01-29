const API_URL = 'http://localhost:5000/api'

// Auth Service
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Login failed')
    return data
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.')
  }
}

// Destinations Service
export const getDestinations = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/destinations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  } catch (error) {
    throw new Error('Failed to fetch destinations')
  }
}

export const addDestination = async (destinationData) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No authentication token found')
    }

    // Format the data to match backend expectations
    const formattedData = {
      name: destinationData.name,
      country: destinationData.country,
      description: destinationData.description,
      price: Number(destinationData.price),
      image: destinationData.image
    }

    const response = await fetch(`${API_URL}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formattedData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to add destination')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error adding destination:', error)
    throw new Error(error.message || 'Failed to add destination')
  }
}

// Update the getAuthHeader function
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No authentication token found')
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

// Update the updateDestination function
export const updateDestination = async (id, destinationData) => {
  try {
    console.log('Updating destination:', { id, destinationData })
    const response = await fetch(`${API_URL}/destinations/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(destinationData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update destination')
    }

    return await response.json()
  } catch (error) {
    console.error('Update error:', error)
    throw error
  }
}

// Update the deleteDestination function
export const deleteDestination = async (id) => {
  try {
    console.log('Deleting destination:', id)
    const response = await fetch(`${API_URL}/destinations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete destination')
    }

    return await response.json()
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
}

// Users Service
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeader()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch users')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Bookings Service
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings/all`, {
      headers: getAuthHeader()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch bookings')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
} 