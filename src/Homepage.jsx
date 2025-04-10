import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  const options = [
    { name: 'San Fermin', concertId: 1, image: '/sanfermin.jpg', subtext: 'An American indie rock collective' },
    { name: 'Sparkbird', concertId: 2, image: '/sparkbird.jpg', subtext: 'A indie pop folk songwriter' },
    { name: 'Cosmo Sheldrake', concertId: 3, image: '/cosmo.jpg', subtext: 'A multi-instrumentalist musician, producing songs in a wide range of genres.' },
    { name: 'The Crane Wives', concertId: 4, image: '/cranewives.jpg', subtext: 'A four-piece indie band founded in The Grand Rapids' },
    { name: 'Rabbitology', concertId: 5, image: '/rabbitology.jpg', subtext: 'A new artist wrapping Alternative/Indie music into small short stories' },
    { name: 'Oh Hellos', concertId: 6, image: '/ohhellos.jpeg', subtext: 'An American indie folk rock duo formed in 2011 in San Marcos, Texas,' },
    { name: 'The Paper Kites', concertId: 7, image: '/paperkites.jpg', subtext: 'A 2009 Australian indie rock/folk rock band from Melbourne' },
    { name: 'Mother Falcon', concertId: 8, image: '/motherfalcon.jpg', subtext: 'Mother Falcon is a symphonic rock band, of more than twenty members' },
    { name: 'Mumford & Sons', concertId: 9, image: '/mumford2.jpg', subtext: 'A British folk rock band formed in London in 2007' },
    { name: 'Lord Huron', concertId: 10, image: '/lordhuron.jpg', subtext: 'Los Angeles-based American indie rock band' },
    { name: 'Agnes Obel', concertId: 11, image: '/agnesobel.jpg', subtext: 'A indie folk Danish singer, songwriter, and musician based in Berlin' },
    { name: 'Mako', concertId: 12, image: '/mako.jpg', subtext: 'A folk-indie song writer telling tales about myths & fables' },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to the Ticket Ordering App!</h1>
      <p>Select an event below to order your tickets:</p>
      <br /><br /><br /><br />
      <div className="card-container">
        {options.map((option) => (
          <Link 
            to={`/order/${option.name}?concertId=${option.concertId}`} 
            key={option.name} 
            className="card-link"
          >
            <div className="card">
              <img src={option.image} alt={option.name} className="card-image" />
              <h2 className="card-title">{option.name}</h2>
              <p className="card-subtext">{option.subtext}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
