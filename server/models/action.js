const mongoose = require('./../db.js');

const actionSchema = mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  chore: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Action', actionSchema);