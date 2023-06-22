import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [companyName, setCompanyName] = useState('');
  const [giveawayTitle, setGiveawayTitle] = useState('');
  const [giveawayQuantity, setGiveawayQuantity] = useState('');
  const [giveawayAddress, setGiveawayAddress] = useState('');

  const handleCompanyRegistration = (e) => {
    e.preventDefault();

    // Perform company registration logic, e.g., send registration request to backend API
    // using the companyName value
    console.log('Company registered:', companyName);

    // Reset the form field
    setCompanyName('');
  };

  const handleGiveawayCreation = (e) => {
    e.preventDefault();

    // Perform giveaway creation logic, e.g., send creation request to backend API
    // using the giveawayTitle, giveawayQuantity, and giveawayAddress values
    console.log('Giveaway created:', giveawayTitle, giveawayQuantity, giveawayAddress);

    // Reset the form fields
    setGiveawayTitle('');
    setGiveawayQuantity('');
    setGiveawayAddress('');
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Company Registration</h2>
      <form onSubmit={handleCompanyRegistration}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Company</button>
      </form>

      <h2>Giveaway Creation</h2>
      <form onSubmit={handleGiveawayCreation}>
        <div>
          <label>Giveaway Title:</label>
          <input
            type="text"
            value={giveawayTitle}
            onChange={(e) => setGiveawayTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={giveawayQuantity}
            onChange={(e) => setGiveawayQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address for Pickup:</label>
          <input
            type="text"
            value={giveawayAddress}
            onChange={(e) => setGiveawayAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Giveaway</button>
      </form>
    </div>
  );
}

export default AdminPanel;

