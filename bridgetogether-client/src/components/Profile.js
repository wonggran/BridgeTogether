import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [participationHistory, setParticipationHistory] = useState([]);

  useEffect(() => {
    // Fetch user profile from the backend API
    axios.get('/api/profile')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch user's participation history from the backend API
    axios.get('/api/participation-history')
      .then(response => {
        setParticipationHistory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Participation History:</h2>
      {participationHistory.length === 0 ? (
        <p>No participation history available.</p>
      ) : (
        <ul>
          {participationHistory.map(historyItem => (
            <li key={historyItem.id}>
              <p>Giveaway: {historyItem.giveawayTitle}</p>
              <p>Date: {historyItem.date}</p>
              <p>Quantity: {historyItem.quantity}</p>
              <p>Status: {historyItem.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;

