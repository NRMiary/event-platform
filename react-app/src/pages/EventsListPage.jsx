import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour les filtres
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(res => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger les événements.');
        setLoading(false);
      });
  }, []);

  // Applique les filtres au tableau d'événements
  const applyFilters = () => {
    let filtered = [...events];

    if (dateFilter) {
      filtered = filtered.filter(evt => {
        // on compare uniquement la partie date (YYYY-MM-DD)
        const evtDate = new Date(evt.date_event).toISOString().slice(0, 10);
        return evtDate === dateFilter;
      });
    }

    if (nameFilter.trim()) {
      filtered = filtered.filter(evt =>
        evt.title.toLowerCase().includes(nameFilter.trim().toLowerCase())
      );
    }

    if (locationFilter.trim()) {
      filtered = filtered.filter(evt =>
        evt.location.toLowerCase().includes(locationFilter.trim().toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  // Gestion du clic sur "Rechercher"
  const handleSubmit = e => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <>
      <div style={{ marginTop: '60px' }} />

      <div className="events-list-page">

        {/* Formulaire de filtres */}
        <form className="events-search" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  placeholder="Date"
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  value={nameFilter}
                  onChange={e => setNameFilter(e.target.value)}
                  placeholder="Événement"
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  value={locationFilter}
                  onChange={e => setLocationFilter(e.target.value)}
                  placeholder="Localisation"
                />
              </div>
              <div className="col-12 col-md-3">
                <input className="btn gradient-bg" type="submit" value="Rechercher" />
              </div>
            </div>
          </div>
        </form>

        <div className="container">
          {loading && (
            <div className="row">
              <div className="col-12 text-center" style={{ marginTop: '30px' }}>
                <p>Chargement des événements…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="row">
              <div className="col-12 text-center" style={{ marginTop: '30px', color: 'red' }}>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="row">
              <div className="col-12 text-center" style={{ marginTop: '30px' }}>
                <p>Aucun événement ne correspond aux filtres.</p>
              </div>
            </div>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className="row events-list">
              {filteredEvents.map(evt => (
                <div key={evt.id} className="col-12 col-lg-6 single-event visible">
                  <figure className="events-thumbnail">
                    <a href="#"><img src="/images/next1.jpg" alt="1" /></a>
                  </figure>

                  <div className="event-content-wrap">
                    <header className="entry-header flex justify-content-between">
                      <div>
                        <h2 className="entry-title">
                          <Link to={`/events/${evt.id}`}>{evt.title}</Link>
                        </h2>
                        <div className="event-location">
                          <a href="#">{evt.location}</a>
                        </div>
                        <div className="event-date">
                          {new Date(evt.date_event).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                          {evt.start_time && ` @ ${evt.start_time}`}
                        </div>
                      </div>
                    </header>

                    {evt.description && (
                      <div className="entry-content">
                        <p>{evt.description}</p>
                      </div>
                    )}

                    <footer className="entry-footer">
                      <Link to={`/register?event_id=${evt.id}`}>
                        S'inscrire
                      </Link>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
