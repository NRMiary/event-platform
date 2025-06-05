import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsletterForm from './components/NewsletterForm';
import HomePage from './pages/HomePage';
import EventsListPage from './pages/EventsListPage';
import RegistrationPage from './pages/RegistrationPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
      <NewsletterForm />
      <Footer />
    </>
  );
}
