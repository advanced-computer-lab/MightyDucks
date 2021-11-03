const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
  to: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  first: {
    type: Number,
    required: true
  },
  business: {
    type: Number,
    required: true
  },
  economy: {
    type: Number,
    required: true
  }
});

const flights = mongoose.model('flights', flightSchema);
module.exports = flights;