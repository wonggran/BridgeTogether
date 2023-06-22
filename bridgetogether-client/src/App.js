import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route exact path="/" component={HomePage} />
          <Route path="/giveaway/:id" component={GiveawayDetail} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={AdminPanel} />
        </Routes>
    </div>
  );
}

export default App;
