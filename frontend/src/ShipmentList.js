import React from 'react';
import './ShipmentList.css';

const ShipmentList = ({ shipments, onEdit, onDelete, onFilterChange, selectedStatus }) => {
  const statuses = ['All', 'Pending', 'In Transit', 'Delivered', 'Cancelled'];

  return (
    <div className="shipment-list-container">
      <h2>Shipments</h2>
      
      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="status-filter"
        >
          {statuses.map(status => (
            <option key={status} value={status === 'All' ? '' : status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {shipments.length === 0 ? (
        <p className="no-shipments">No shipments found. Add one to get started!</p>
      ) : (
        <div className="shipments-grid">
          {shipments.map(shipment => (
            <div key={shipment.id} className="shipment-card">
              <div className="shipment-header">
                <h3>{shipment.shipment_id}</h3>
                <span className={`status-badge status-${shipment.status.replace(/\s+/g, '-').toLowerCase()}`}>
                  {shipment.status}
                </span>
              </div>
              
              <div className="shipment-details">
                <div className="detail-row">
                  <strong>Origin:</strong>
                  <span>{shipment.origin}</span>
                </div>
                <div className="detail-row">
                  <strong>Destination:</strong>
                  <span>{shipment.destination}</span>
                </div>
                <div className="detail-row">
                  <strong>Weight:</strong>
                  <span>{shipment.weight} kg</span>
                </div>
                <div className="detail-row">
                  <strong>Created:</strong>
                  <span>{new Date(shipment.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="shipment-actions">
                <button className="btn-edit" onClick={() => onEdit(shipment)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => {
                  if (window.confirm('Are you sure you want to delete this shipment?')) {
                    onDelete(shipment.id);
                  }
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShipmentList;
