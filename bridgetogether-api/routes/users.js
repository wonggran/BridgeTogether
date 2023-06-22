const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Giveaway = require('../models/Giveaway');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user details
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reserve a good in a give-away
router.post('/:userId/reserve/:giveawayId', async (req, res) => {
  try {
    const { userId, giveawayId } = req.params;
    const user = await User.findById(userId);
    const giveaway = await Giveaway.findById(giveawayId);

    if (!user || !giveaway) {
      return res.status(404).json({ error: 'User or Giveaway not found' });
    }

    if (giveaway.quantity <= 0) {
      return res.status(400).json({ error: 'Giveaway out of stock' });
    }

    // Check if the user has already reserved a unit of the good
    const hasReserved = user.giveaways.some(
      (reservedGiveaway) => reservedGiveaway.toString() === giveawayId
    );
    if (hasReserved) {
      return res.status(400).json({ error: 'User has already reserved this giveaway' });
    }

    // Reserve the good and update the quantity
    user.giveaways.push(giveawayId);
    giveaway.quantity -= 1;
    await user.save();
    await giveaway.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notify the company when a user receives their one unit of the good
router.post('/:userId/notify/:giveawayId', async (req, res) => {
  try {
    const { userId, giveawayId } = req.params;
    const user = await User.findById(userId);
    const giveaway = await Giveaway.findById(giveawayId);

    if (!user || !giveaway) {
      return res.status(404).json({ error: 'User or Giveaway not found' });
    }

    // Check if the user has reserved the giveaway
    const hasReserved = user.giveaways.some(
      (reservedGiveaway) => reservedGiveaway.toString() === giveawayId
    );
    if (!hasReserved) {
      return res.status(400).json({ error: 'User has not reserved this giveaway' });
    }

    // Remove the giveaway from the user's reserved list and update the quantity
    user.giveaways = user.giveaways.filter(
      (reservedGiveaway) => reservedGiveaway.toString() !== giveawayId
    );
    giveaway.quantity += 1;
    await user.save();
    await giveaway.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

