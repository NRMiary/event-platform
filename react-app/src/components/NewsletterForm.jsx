import React, { useState } from 'react';
import axios from 'axios';

export default function NewsletterForm() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState(null);

  const API_BASE_URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8000'
    : import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/newsletter/subscribe`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (res.data.success) {
        setStatus('Merci pour votre inscription !');
        setEmail('');
      } else {
        setStatus(res.data.error || 'Erreur lors de l’inscription');
      }
    } catch (err) {
      console.error(err);
      setStatus('Erreur réseau');
    }
  };

  return (
    <div className="newsletter-subscribe">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header className="entry-header">
              <h2 className="entry-title">
                Abonnez-vous à notre newsletter pour recevoir les dernières actualités
              </h2>
              <p>Rejoignez notre base de données MAINTENANT !</p>
            </header>
            <div className="newsletter-form">
              <form
                className="flex flex-wrap justify-content-center align-items-center"
                onSubmit={handleSubmit}
              >
                <div className="col-md-12 col-lg-3">
                  <input
                    type="email"
                    placeholder="Votre e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12 col-lg-3">
                  <input className="btn gradient-bg" type="submit" value="S'abonner" />
                </div>
              </form>
              {status && (
                <div className="mt-3 text-center">
                  <span>{status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
