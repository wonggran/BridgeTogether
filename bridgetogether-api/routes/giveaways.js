const express = require('express');
const router = express.Router();
const Giveaway = require('../models/Giveaway');

// Create a new give-away
router.post('/', async (req, res) => {
  try {
    const { title, startDate, endDate, good, quantity, pickupAddress } = req.body;

    const newGiveaway = new Giveaway({
      title,
      startDate,
      endDate,
      good,
      quantity,
      pickupAddress,
    });

    await newGiveaway.save();

    res.status(201).json({ message: 'Give-away created successfully' });
  } catch (error) {
    // res.status(500).json({ error: 'An error occurred while creating the give-away' });
    res.status(500).json(error);

  }
});

// Update give-away details
router.put('/:giveawayId', async (req, res) => {
  try {
    const { giveawayId } = req.params;
    const { title, startDate, endDate, good, quantity, pickupAddress } = req.body;

    const updatedGiveaway = await Giveaway.findByIdAndUpdate(
      giveawayId,
      { title, startDate, endDate, good, quantity, pickupAddress },
      { new: true }
    );

    if (!updatedGiveaway) {
      return res.status(404).json({ error: 'Give-away not found' });
    }

    res.json(updatedGiveaway);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the give-away' });
  }
});

// Delete a give-away
router.delete('/:giveawayId', async (req, res) => {
  try {
    const { giveawayId } = req.params;

    const deletedGiveaway = await Giveaway.findByIdAndRemove(giveawayId);

    if (!deletedGiveaway) {
      return res.status(404).json({ error: 'Give-away not found' });
    }

    res.json({ message: 'Give-away deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the give-away' });
  }
});

// Retrieve active give-aways
router.get('/active', async (req, res) => {
  try {
    const activeGiveaways = await Giveaway.find({ endDate: { $gte: new Date() } });

    res.json(activeGiveaways);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving active give-aways' });
  }
});

module.exports = router;

