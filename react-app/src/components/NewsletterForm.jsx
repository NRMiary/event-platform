import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('Merci pour votre inscription !');
          setEmail('');
        } else {
          setStatus(data.error || 'Erreur lors de l’inscription');
        }
      })
      .catch(() => setStatus('Erreur réseau'));
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
