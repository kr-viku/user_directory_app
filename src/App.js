


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserDetails from './components/UserDetails';
import UserPage from './Pages/UserPage'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

