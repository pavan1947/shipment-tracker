import React from 'react';
import './ShipmentForm.css';

const ShipmentForm = ({ onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = React.useState({
    shipment_id: '',
    origin: '',
    destination: '',
    weight: '',
    status: 'Pending',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.shipment_id || !formData.origin || !formData.destination || !formData.weight) {
      alert('Please fill all required fields');
      return;
    }

    onSubmit(formData);
    setFormData({
      shipment_id: '',
      origin: '',
      destination: '',
      weight: '',
      status: 'Pending'
    });
  };

  return (
    <form className="shipment-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Shipment' : 'Add New Shipment'}</h2>
      
      <div className="form-group">
        <label htmlFor="shipment_id">Shipment ID *</label>
        <input
          type="text"
          id="shipment_id"
          name="shipment_id"
          value={formData.shipment_id}
          onChange={handleChange}
          placeholder="e.g., SHIP-001"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="origin">Origin *</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="e.g., New York"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination *</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="e.g., Los Angeles"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight (kg) *</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="e.g., 50.5"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button type="submit" className="btn-submit">
        {isEditing ? 'Update Shipment' : 'Add Shipment'}
      </button>
    </form>
  );
};

export default ShipmentForm;
