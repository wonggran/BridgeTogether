const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Register a new company
router.post('/', async (req, res) => {
  try {
    const { companyName } = req.body;

    // Check if the company name is already taken
    const existingCompany = await Company.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ error: 'Company name already taken' });
    }

    // Create a new company
    const newCompany = new Company({ companyName });
    await newCompany.save();

    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the company' });
  }
});

// Update company details
router.put('/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const { companyName } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { companyName },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the company' });
  }
});

// Delete a company
router.delete('/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;

    const deletedCompany = await Company.findByIdAndRemove(companyId);

    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the company' });
  }
});

module.exports = router;

