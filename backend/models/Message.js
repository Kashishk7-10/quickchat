const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  image: String,
  avatar: String,
  timestamp: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
