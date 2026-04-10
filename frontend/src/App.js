import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipmentForm from './ShipmentForm';
import ShipmentList from './ShipmentList';
import './App.css';

function App() {
  const [shipments, setShipments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api/shipments';

  // Fetch all shipments
  const fetchShipments = async (status = '') => {
    setLoading(true);
    try {
      const url = status ? `${API_URL}?status=${status}` : API_URL;
      const response = await axios.get(url);
      setShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      alert('Failed to fetch shipments');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchShipments();
  }, []);

  // Handle adding new shipment
  const handleAddShipment = async (formData) => {
    try {
      const response = await axios.post(API_URL, {
        ...formData,
        weight: parseFloat(formData.weight)
      });
      setShipments([response.data, ...shipments]);
      alert('Shipment added successfully!');
    } catch (error) {
      console.error('Error adding shipment:', error);
      alert(error.response?.data?.error || 'Failed to add shipment');
    }
  };

  // Handle editing shipment
  const handleEditShipment = (shipment) => {
    setEditingShipment(shipment);
    setIsEditing(true);
  };

  // Handle updating shipment
  const handleUpdateShipment = async (formData) => {
    try {
      const response = await axios.put(`${API_URL}/${editingShipment.id}`, {
        ...formData,
        weight: parseFloat(formData.weight)
      });
      setShipments(shipments.map(s => s.id === editingShipment.id ? response.data : s));
      setIsEditing(false);
      setEditingShipment(null);
      alert('Shipment updated successfully!');
    } catch (error) {
      console.error('Error updating shipment:', error);
      alert(error.response?.data?.error || 'Failed to update shipment');
    }
  };

  // Handle deleting shipment
  const handleDeleteShipment = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setShipments(shipments.filter(s => s.id !== id));
      alert('Shipment deleted successfully!');
    } catch (error) {
      console.error('Error deleting shipment:', error);
      alert('Failed to delete shipment');
    }
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    if (isEditing) {
      handleUpdateShipment(formData);
    } else {
      handleAddShipment(formData);
    }
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    fetchShipments(status);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📦 Shipment Tracker</h1>
        <p>Manage and track your shipments with ease</p>
      </header>

      <main className="app-main">
        <div className="container">
          <ShipmentForm
            onSubmit={handleFormSubmit}
            initialData={editingShipment}
            isEditing={isEditing}
          />

          {isEditing && (
            <button
              className="btn-cancel-edit"
              onClick={() => {
                setIsEditing(false);
                setEditingShipment(null);
              }}
            >
              Cancel Edit
            </button>
          )}

          {loading ? (
            <p className="loading">Loading shipments...</p>
          ) : (
            <ShipmentList
              shipments={shipments}
              onEdit={handleEditShipment}
              onDelete={handleDeleteShipment}
              onFilterChange={handleFilterChange}
              selectedStatus={selectedStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
