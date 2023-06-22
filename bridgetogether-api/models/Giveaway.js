const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  good: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Giveaway', giveawaySchema);

