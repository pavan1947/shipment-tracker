# Quick Start Guide - Shipment Tracker

## Windows Users - Follow These Steps

### 1. Set Up MySQL Database

Open MySQL Command Line or MySQL Workbench:
```bash
mysql -u root -p
# Enter password: root

# Copy and run this SQL:
CREATE DATABASE IF NOT EXISTS shipment_tracker;
USE shipment_tracker;

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

CREATE INDEX idx_shipment_id ON shipments(shipment_id);
CREATE INDEX idx_status ON shipments(status);
CREATE INDEX idx_created_at ON shipments(created_at);
```

### 2. Install Dependencies (One-Click)

Double-click `setup.bat` in the project folder. This will:
- Install backend dependencies
- Install frontend dependencies

### 3. Start Backend Server

Open PowerShell/Command Prompt and run:
```bash
cd shipment-tracker\backend
npm start
```

You should see: `Server running at http://localhost:5000`

### 4. Start Frontend (New Terminal)

Open a new PowerShell/Command Prompt and run:
```bash
cd shipment-tracker\frontend
npm start
```

This will automatically open http://localhost:3000 in your browser.

### 5. That's It! 🎉

You now have:
- ✅ Frontend running on http://localhost:3000
- ✅ Backend API running on http://localhost:5000
- ✅ MySQL database connected

## Common Issues & Fixes

### "MySQL connection error"
- Check MySQL is running
- Verify username: `root` and password: `root`
- Make sure database `shipment_tracker` exists

### "Port 3000/5000 already in use"
- Kill the process using the port or use different port

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

## Features Available

1. ✅ Add new shipments
2. ✅ View all shipments in a grid
3. ✅ Edit existing shipments
4. ✅ Delete shipments
5. ✅ Filter by status (Pending, In Transit, Delivered, Cancelled)
6. ✅ Responsive design for mobile & desktop

## Database Details

- **Username:** root
- **Password:** root
- **Database:** shipment_tracker
- **Port:** Default MySQL port (3306)

## Backend API Endpoints

```
GET    /api/shipments              - Get all shipments
GET    /api/shipments?status=X     - Filter by status
GET    /api/shipments/:id          - Get single shipment
POST   /api/shipments              - Create new shipment
PUT    /api/shipments/:id          - Update shipment
DELETE /api/shipments/:id          - Delete shipment
```

## Enjoy! 🚀

If you need help, check the README.md file for more details.
