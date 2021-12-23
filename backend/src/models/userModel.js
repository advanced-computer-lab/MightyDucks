const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passportNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  flights: {
    type: [String],
    required: true
  },
  homeAddress: {
    type: String
  },
  telephoneNumber: {
    type: String,
  },
  countryCode:{
    type: String
  }

});

const users = mongoose.model('users', userSchema);
module.exports = users;