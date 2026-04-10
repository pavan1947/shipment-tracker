const express = require('express');
const router = express.Router();
const {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipment
} = require('./shipmentController');

// GET all shipments (with optional status filter)
router.get('/', getShipments);

// GET single shipment by ID
router.get('/:id', getShipmentById);

// CREATE new shipment
router.post('/', createShipment);

// UPDATE shipment
router.put('/:id', updateShipment);

// DELETE shipment
router.delete('/:id', deleteShipment);

module.exports = router;
