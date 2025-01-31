import { useState, useEffect } from 'react'
import { 
  addDestination, 
  getDestinations, 
  updateDestination, 
  deleteDestination 
} from '../../services/api'
import AddDestinationForm from '../../components/Destinations/AddDestinationForm'
import EditDestinationForm from '../../components/Destinations/EditDestinationForm'
import './Destinations.css'

function DestinationList() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const data = await getDestinations()
      setDestinations(data)
    } catch (error) {
      setError('Failed to fetch destinations')
    } finally {
      setLoading(false)
    }
  }

  const handleAddDestination = async (destinationData) => {
    try {
      const newDestination = await addDestination(destinationData)
      setDestinations(prev => [...prev, newDestination])
      setShowAddForm(false)
    } catch (error) {
      throw new Error('Failed to add destination')
    }
  }

  const handleEditClick = (destination) => {
    console.log('Edit clicked for:', destination)
    setSelectedDestination(destination)
    setShowEditForm(true)
  }

  const handleUpdateDestination = async (id, updatedData) => {
    try {
      setLoading(true)
      const updated = await updateDestination(id, updatedData)
      setDestinations(prev => 
        prev.map(dest => dest._id === id ? updated : dest)
      )
      setShowEditForm(false)
      setSelectedDestination(null)
      alert('Destination updated successfully!')
    } catch (error) {
      alert(error.message || 'Failed to update destination')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        setLoading(true)
        await deleteDestination(id)
        setDestinations(prev => prev.filter(dest => dest._id !== id))
        alert('Destination deleted successfully!')
      } catch (error) {
        alert(error.message || 'Failed to delete destination')
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="destinations-page">
      <div className="page-header">
        <h2>Manage Destinations</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add New Destination
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddDestinationForm
              onAdd={handleAddDestination}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {showEditForm && selectedDestination && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditDestinationForm
              destination={selectedDestination}
              onUpdate={handleUpdateDestination}
              onClose={() => {
                setShowEditForm(false)
                setSelectedDestination(null)
              }}
            />
          </div>
        </div>
      )}

      <div className="destinations-grid">
        {destinations.map(destination => (
          <div key={destination._id} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <div className="destination-info">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <div className="destination-details">
                <span>Price: ₹{destination.price}</span>
                <span>Country: {destination.country}</span>
              </div>
              <div className="card-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditClick(destination)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteClick(destination._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationList