# Shipment Tracker Application

A simple and efficient web application to manage and track shipments using the MERN stack with MySQL.

## Features

✅ **Add New Shipments** - Create shipments with ID, origin, destination, weight, and status
✅ **View All Shipments** - Display all shipments in an organized grid layout
✅ **Edit Shipments** - Update existing shipment details
✅ **Delete Shipments** - Remove shipments from the system
✅ **Filter by Status** - View shipments filtered by their status (Pending, In Transit, Delivered, Cancelled)
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices

## Project Structure

```
shipment-tracker/
├── schema.sql                 # MySQL database schema
├── backend/                   # Node.js/Express Backend
│   ├── package.json
│   ├── server.js             # Main server file
│   ├── db.js                 # Database connection
│   ├── shipmentController.js # Business logic
│   ├── routes.js             # API routes
│   └── .env                  # Environment variables
└── frontend/                  # React Frontend
    ├── package.json
    ├── public/
    │   └── index.html
    ├── App.js
    ├── App.css
    ├── ShipmentForm.js
    ├── ShipmentForm.css
    ├── ShipmentList.js
    ├── ShipmentList.css
    └── index.js
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

## Setup Instructions

### Step 1: Set Up MySQL Database

1. Open MySQL and run the schema:
   ```bash
   mysql -u root -p < schema.sql
   ```
   Or if you prefer to do it manually:
   - Open MySQL Workbench or MySQL CLI
   - Copy and paste the contents of `schema.sql`
   - Execute it

2. Verify the database was created:
   ```bash
   mysql -u root -p
   USE shipment_tracker;
   SHOW TABLES;
   ```

### Step 2: Set Up Backend

1. Navigate to the backend folder:
   ```bash
   cd shipment-tracker/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify `.env` file configuration (default values are already set):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=shipment_tracker
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   You should see: `Server running at http://localhost:5000`

### Step 3: Set Up Frontend

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd shipment-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will automatically open at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:5000/api/shipments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all shipments (add `?status=<status>` to filter) |
| GET | `/:id` | Get a specific shipment by ID |
| POST | `/` | Create a new shipment |
| PUT | `/:id` | Update an existing shipment |
| DELETE | `/:id` | Delete a shipment |

### Example API Requests

**Get all shipments:**
```bash
curl http://localhost:5000/api/shipments
```

**Get shipments by status:**
```bash
curl http://localhost:5000/api/shipments?status=Delivered
```

**Create a new shipment:**
```bash
curl -X POST http://localhost:5000/api/shipments \
  -H "Content-Type: application/json" \
  -d '{
    "shipment_id": "SHIP-001",
    "origin": "New York",
    "destination": "Los Angeles",
    "weight": 50.5,
    "status": "Pending"
  }'
```

**Update a shipment:**
```bash
curl -X PUT http://localhost:5000/api/shipments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "shipment_id": "SHIP-001",
    "origin": "New York",
    "destination": "Los Angeles",
    "weight": 50.5,
    "status": "In Transit"
  }'
```

**Delete a shipment:**
```bash
curl -X DELETE http://localhost:5000/api/shipments/1
```

## Database Schema

### Shipments Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key, auto-increment |
| shipment_id | VARCHAR(50) UNIQUE | Unique shipment identifier |
| origin | VARCHAR(255) | Departure location |
| destination | VARCHAR(255) | Arrival location |
| weight | DECIMAL(10,2) | Weight in kilograms |
| status | ENUM | Status: Pending, In Transit, Delivered, Cancelled |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

## Usage

1. **Add a Shipment:**
   - Fill in the form with shipment details
   - Click "Add Shipment"

2. **View Shipments:**
   - All shipments are displayed in a card grid
   - Each card shows all shipment details

3. **Filter by Status:**
   - Use the dropdown filter above the shipments list
   - Select a status to filter shipments

4. **Edit a Shipment:**
   - Click the "Edit" button on any shipment card
   - Update the details in the form
   - Click "Update Shipment"

5. **Delete a Shipment:**
   - Click the "Delete" button on any shipment card
   - Confirm the deletion

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MySQL2** - MySQL database driver
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists: `USE shipment_tracker;`

### CORS Error
- Backend CORS is enabled for all origins
- Check backend is running on port 5000

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: Use `PORT=3001 npm start` to use different port

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

## License

ISC

## Support

For issues or questions, please check the setup instructions again or verify:
1. MySQL is running and accessible
2. Database schema has been imported
3. Both backend and frontend servers are running
4. No port conflicts on 3000 (frontend) and 5000 (backend)
