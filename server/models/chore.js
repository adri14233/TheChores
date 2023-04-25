const mongoose = require('./../db.js');

const choreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Chore', choreSchema);