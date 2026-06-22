const express = require('express')

const protect = require('../middleware/authMiddleware')

const {
  createTrip,
  getMyTrips,
  deleteTrip,
  testGemini,
} = require('../controllers/tripController')

const router = express.Router()

router.post('/', protect, createTrip)
router.get('/', protect, getMyTrips)
router.delete('/:id', protect, deleteTrip)
router.get('/test-ai', protect, testGemini)

module.exports = router