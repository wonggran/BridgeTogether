import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GiveawayDetail() {
  const { id } = useParams();
  const [giveaway, setGiveaway] = useState(null);

  useEffect(() => {
    // Fetch giveaway details from the backend API
    axios.get(`/api/giveaways/${id}`)
      .then(response => {
        setGiveaway(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  if (!giveaway) {
    return <p>Loading giveaway details...</p>;
  }

  return (
    <div>
      <h1>{giveaway.title}</h1>
      <p>{giveaway.description}</p>
      <p>Start Date: {giveaway.startDate}</p>
      <p>End Date: {giveaway.endDate}</p>
      <p>Quantity Available: {giveaway.quantity}</p>
      <p>Pickup Address: {giveaway.pickupAddress}</p>
      <button>Reserve</button>
    </div>
  );
}

export default GiveawayDetail;

