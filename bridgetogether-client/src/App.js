import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GiveawayDetail from './components/GiveawayDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/giveaway/:id" element={<GiveawayDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </div>
  );
}

export default App;
