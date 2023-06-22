import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [giveaways, setGiveaways] = useState([]);

  useEffect(() => {
    // Fetch giveaways from the backend API
    axios.get('/api/giveaways')
      .then(response => {
        setGiveaways(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>BridgeTogether - Giveaways</h1>
      {giveaways.length === 0 ? (
        <p>No giveaways available at the moment.</p>
      ) : (
        <ul>
          {giveaways.map(giveaway => (
            <li key={giveaway.id}>
              <h2>{giveaway.title}</h2>
              <p>{giveaway.description}</p>
              <p>Start Date: {giveaway.startDate}</p>
              <p>End Date: {giveaway.endDate}</p>
              <p>Quantity Available: {giveaway.quantity}</p>
              <p>Pickup Address: {giveaway.pickupAddress}</p>
              <button>Reserve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;

