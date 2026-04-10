const pool = require('./db');

// Get all shipments with optional status filter
const getShipments = async (req, res) => {
  const { status } = req.query;
  let query = 'SELECT * FROM shipments';
  let params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, params);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
};

// Get single shipment by ID
const getShipmentById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM shipments WHERE id = ?',
      [id]
    );
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching shipment:', error);
    res.status(500).json({ error: 'Failed to fetch shipment' });
  }
};

// Create new shipment
const createShipment = async (req, res) => {
  const { shipment_id, origin, destination, weight, status } = req.body;

  // Validation
  if (!shipment_id || !origin || !destination || !weight) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO shipments (shipment_id, origin, destination, weight, status) VALUES (?, ?, ?, ?, ?)',
      [shipment_id, origin, destination, weight, status || 'Pending']
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      shipment_id,
      origin,
      destination,
      weight,
      status: status || 'Pending'
    });
  } catch (error) {
    console.error('Error creating shipment:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Shipment ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create shipment' });
  }
};

// Update shipment
const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { shipment_id, origin, destination, weight, status } = req.body;

  if (!shipment_id || !origin || !destination || !weight) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await pool.getConnection();
    
    // Check if shipment exists
    const [existingShipment] = await connection.execute(
      'SELECT * FROM shipments WHERE id = ?',
      [id]
    );

    if (existingShipment.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Shipment not found' });
    }

    // Update shipment
    await connection.execute(
      'UPDATE shipments SET shipment_id = ?, origin = ?, destination = ?, weight = ?, status = ? WHERE id = ?',
      [shipment_id, origin, destination, weight, status || 'Pending', id]
    );
    connection.release();

    res.json({
      id: parseInt(id),
      shipment_id,
      origin,
      destination,
      weight,
      status: status || 'Pending'
    });
  } catch (error) {
    console.error('Error updating shipment:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Shipment ID already exists' });
    }
    res.status(500).json({ error: 'Failed to update shipment' });
  }
};

// Delete shipment
const deleteShipment = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    
    // Check if shipment exists
    const [existingShipment] = await connection.execute(
      'SELECT * FROM shipments WHERE id = ?',
      [id]
    );

    if (existingShipment.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Shipment not found' });
    }

    // Delete shipment
    await connection.execute('DELETE FROM shipments WHERE id = ?', [id]);
    connection.release();

    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting shipment:', error);
    res.status(500).json({ error: 'Failed to delete shipment' });
  }
};

module.exports = {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment
};
