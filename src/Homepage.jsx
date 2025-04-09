// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const options = [
    { name: 'San Fermin', concertId: 1 },
    { name: 'Sparkbird', concertId: 2 },
    { name: 'Cosmo Sheldrake', concertId: 3 },
    { name: 'The Crane Wives', concertId: 4 },
    { name: 'Rabbitology', concertId: 5 },
    { name: 'Oh Hellos', concertId: 6 },
    { name: 'The Paper Kites', concertId: 7 },
    { name: 'Mother Falcon', concertId: 8 },
    { name: 'Mumford & Sons', concertId: 9 },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to the Ticket Ordering App!</h1>
      <p>Select an event below to order your tickets:</p>
      <br></br> <br></br> <br></br> <br></br>
      <div className="card-container">
        {options.map((option) => (
          <Link 
            to={`/order/${option.name}?concertId=${option.concertId}`} 
            key={option.name} 
            className="card-link"
          >
            <div className="card">
              <img src="/concert.jpg" alt={option.name} className="card-image" />
              <h2 className="card-title">{option.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
