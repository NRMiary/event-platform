import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then((data) => {
        // On affiche uniquement les événements futurs
        const today = new Date();
        const upcoming = data.filter((evt) => new Date(evt.date_event) >= today);
        setEvents(upcoming);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Impossible de charger les événements.');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeroSlider />

      {/* Section “Découvrez nos prochains événements” */}
      <div className="homepage-next-events">
        <div className="container">
          <div style={{ height: '40px' }} />
          <div className="row">
            <div className="next-events-section-header" style={{ textAlign: 'center' }}>
              <h2 className="entry-title">Découvrez nos prochains événements</h2>
            </div>
          </div>

          {loading && (
            <div className="row">
              <div className="col-12" style={{ textAlign: 'center', marginTop: '30px' }}>
                <p>Chargement des événements…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="row">
              <div className="col-12" style={{ textAlign: 'center', marginTop: '30px', color: 'red' }}>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="row">
              <div className="col-12" style={{ textAlign: 'center', marginTop: '30px' }}>
                <p>Aucun événement à venir pour le moment.</p>
              </div>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="row">
              {events.map((evt) => (
                <div key={evt.id} className="col-12 col-sm-6 col-md-4">
                  <div className="next-event-wrap">
                    <figure>
                      <a href="#"><img src="/images/next1.jpg" alt="1" /></a>
                    </figure>
                    <header className="entry-header">
                      <h3 className="entry-title">{evt.title}</h3>
                      <div className="posted-date">
                        {new Date(evt.date_event).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </header>
                    <div className="entry-content">
                      <p>{evt.description}</p>
                      <p>{evt.location}</p>
                    </div>
                    <footer className="entry-footer">
                      <Link to={`/register?event_id=${evt.id}`}>
                        S’inscrire
                      </Link>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marge avant la newsletter */}
      <div style={{ marginTop: '50px' }} />
    </>
  );
}
