import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo-link">
            AppEvent
          </Link>
          <nav>
            <Link to="/" style={{ color: '#fff', margin: '0 10px' }}>Accueil</Link>
            <Link to="/events" style={{ color: '#fff', margin: '0 10px' }}>Événements</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
