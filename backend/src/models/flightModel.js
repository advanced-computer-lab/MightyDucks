const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  cabin: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
});

const flights = mongoose.model('flights', flightSchema);
module.exports = flights;