import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="footer-navigation">
              <ul className="flex flex-wrap justify-content-center align-items-center">
                <li><a href="/">Accueil</a></li>
                <li><a href="/events">Événements</a></li>
              </ul>
            </nav>
            <div className="text-center mt-3">
              &copy; {new Date().getFullYear()} All rights reserved 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
