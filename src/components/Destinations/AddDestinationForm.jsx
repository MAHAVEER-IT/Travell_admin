import { useState } from 'react'
import '../Destinations/Destinations.css'

function AddDestinationForm({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    price: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.country.trim()) return 'Country is required'
    if (!formData.description.trim()) return 'Description is required'
    if (!formData.price || formData.price <= 0) return 'Valid price is required'
    if (!formData.image.trim()) return 'Image URL is required'
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      // Ensure price is a number
      const destinationData = {
        ...formData,
        price: Number(formData.price)
      }

      console.log('Submitting destination:', destinationData) // Debug log
      await onAdd(destinationData)
      onClose()
    } catch (error) {
      console.error('Error in form submission:', error)
      setError(error.message || 'Failed to add destination')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-destination-form">
      <h2>Add New Destination</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Destination Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter destination name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter destination description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Add Destination'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDestinationForm 