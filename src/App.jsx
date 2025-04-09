// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Homepage";
import OrderPage from "./Orderpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order/:eventName" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
