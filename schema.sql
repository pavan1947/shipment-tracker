- Create database
CREATE DATABASE IF NOT EXISTS shipment_tracker;
USE shipment_tracker;

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shipment_id VARCHAR(50) UNIQUE NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  status ENUM('Pending', 'In Transit', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_shipment_id ON shipments(shipment_id);
CREATE INDEX idx_status ON shipments(status);
CREATE INDEX idx_created_at ON shipments(created_at);
