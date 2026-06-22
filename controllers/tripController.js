const Trip = require('../models/Trip')
const {generateTripPlan} = require('../services/geminiService')

const createTrip = async (req, res) => {
  try {
    const {destination, days, budgetType, interests} = req.body

    const aiResult = await generateTripPlan(
      destination,
      days,
      budgetType,
      interests
    )

    const trip = await Trip.create({
      userId: req.user.userId,
      destination,
      days,
      budgetType,
      interests,
      itinerary: aiResult.itinerary,
      budgetEstimate: aiResult.budgetEstimate,
      hotels: aiResult.hotels,
    })

    res.status(201).json(trip)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user.userId,
    })

    res.json(trips)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    })

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found',
      })
    }

    res.json({
      message: 'Trip deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const testGemini = async (req, res) => {
  try {
    console.log('Starting Gemini request...')

    const result = await generateTripPlan(
      'Tokyo',
      5,
      'Medium',
      ['Food', 'Adventure']
    )

    console.log('Gemini response received')

    res.json(result)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createTrip,
  getMyTrips,
  deleteTrip,
  testGemini,
}