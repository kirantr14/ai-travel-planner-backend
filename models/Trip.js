const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budgetType: {
      type: String,
      required: true,
    },

    interests: {
      type: [String],
      default: [],
    },

    itinerary: {
      type: Array,
      default: [],
    },

    budgetEstimate: {
      type: Object,
      default: {},
    },

    hotels: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Trip', tripSchema)