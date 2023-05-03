const mongoose = require('./../db.js');

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
 
});

module.exports = mongoose.model('Group', groupSchema);