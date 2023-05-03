const mongoose = require("./../db.js");

const goalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
