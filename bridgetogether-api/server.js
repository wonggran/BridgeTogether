const express = require('express');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companies');
const giveawayRoutes = require('./routes/giveaways');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bridge_together';

// Connect to the database
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

// Middleware
app.use(express.json());

// API routes
app.use('/api/companies', companyRoutes);
app.use('/api/giveaways', giveawayRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

