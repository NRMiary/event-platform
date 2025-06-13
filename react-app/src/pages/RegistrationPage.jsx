import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RegistrationPage() {
  // Récupérer event_id depuis l’URL : /register?event_id=123
  const { search }      = useLocation();
  const queryParams     = new URLSearchParams(search);
  const eventId         = queryParams.get('event_id');

  const [event, setEvent]               = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [errorEvent, setErrorEvent]     = useState(null);

  // États pour le formulaire d'inscription
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]     = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]     = useState(null);

  // Base URL selon l’environnement
  const API_BASE_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000'
    : import.meta.env.VITE_API_BASE_URL;

  // Charger les détails de l'événement
  useEffect(() => {
    if (!eventId) {
      setErrorEvent('Aucun identifiant d’événement fourni.');
      setLoadingEvent(false);
      return;
    }

    axios.get(`${API_BASE_URL}/events/detail`, {
        params: { id: eventId }
      })
      .then(response => {
        setEvent(response.data);
      })
      .catch(err => {
        console.error(err);
        setErrorEvent('Impossible de charger les informations de l’événement.');
      })
      .finally(() => {
        setLoadingEvent(false);
      });
  }, [API_BASE_URL, eventId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload = {
      event_id: eventId,
      name: name.trim(), 
      email: email.trim(),
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/events/register`,
        payload
      );
      setSubmitSuccess(true);
      // reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setSubmitError(
        err.response?.data?.error ||
        'Une erreur est survenue lors de l’inscription.'
      );
    }
  };

  return (
    <>
      {/* Décalage pour le header fixe */}
      <div style={{ marginTop: '60px' }} />

      <div className="contact-page">
        <div className="container" style={{ marginTop: '40px', marginBottom: '60px' }}>
          <div className="row">
            <div className="next-events-section-header" style={{ textAlign: 'center' }}>
              <h2 className="entry-title">Inscription pour cet événement</h2>
            </div>
          </div>

          {loadingEvent && (
            <div className="row">
              <div className="col-12 text-center">
                <p>Chargement des détails de l’événement…</p>
              </div>
            </div>
          )}

          {errorEvent && (
            <div className="row">
              <div className="col-12 text-center" style={{ color: 'red' }}>
                <p>{errorEvent}</p>
              </div>
            </div>
          )}

          {!loadingEvent && !errorEvent && event && (
            <>
              <div className="row">
                <div className="col-12 col-md-6">
                  <img
                    src="/images/next1.jpg"
                    alt={event.title}
                    style={{ width: '100%', borderRadius: '6px' }}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <h2 className="entry-title">{event.title}</h2>
                  <p style={{ marginTop: '16px', lineHeight: '1.6' }}>
                    {event.description}
                  </p>
                  <p style={{ marginTop: '12px', fontStyle: 'italic' }}>
                    Date :{' '}
                    {new Date(event.date_event).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {event.start_time && ` à ${event.start_time}`}
                  </p>
                  {event.location && (
                    <p style={{ marginTop: '4px' }}>Lieu : {event.location}</p>
                  )}
                </div>
              </div>

              <div className="row" style={{ marginTop: '40px' }}>
                <div className="col-12 col-md-8 offset-md-2">
                  <div className="contact-form">
                    {submitSuccess && (
                      <div
                        style={{
                          padding: '12px 20px',
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          borderRadius: '4px',
                          marginBottom: '20px',
                        }}
                      >
                        Inscription réussie ! Nous vous enverrons un e-mail de confirmation.
                      </div>
                    )}
                    {submitError && (
                      <div
                        style={{
                          padding: '12px 20px',
                          backgroundColor: '#f8d7da',
                          color: '#721c24',
                          borderRadius: '4px',
                          marginBottom: '20px',
                        }}
                      >
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="row">
                      <div className="col-12 col-md-6" style={{ marginBottom: '20px' }}>
                        <input
                          type="text"
                          placeholder="Votre nom"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6" style={{ marginBottom: '20px' }}>
                        <input
                          type="email"
                          placeholder="Votre e-mail"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-12" style={{ marginBottom: '20px' }}>
                        <textarea
                          placeholder="Message (optionnel)"
                          rows="6"
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                        />
                      </div>
                      <div className="col-12 flex justify-content-center">
                        <input
                          className="btn gradient-bg"
                          type="submit"
                          value="Valider mon inscription"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
