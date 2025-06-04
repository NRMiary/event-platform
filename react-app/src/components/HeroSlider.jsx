import React, { useEffect } from 'react';
import Slide from './Slide';

export default function HeroSlider() {
  const slidesData = [
    {
      date: '2018/05/01',
      backgroundImage: '/images/header-bg.jpg',
      title: `Nous avons les meilleurs événements.<br/>Inscrivez-vous maintenant!`,
    },
    {
      date: '2019/05/01',
      backgroundImage: '/images/header-bg.jpg',
      title: `Nous avons les meilleurs événements.<br/>Inscrivez-vous maintenant!`,
    },
    {
      date: '2020/05/01',
      backgroundImage: '/images/header-bg.jpg',
      title: `Nous avons les meilleurs événements.<br/>Inscrivez-vous maintenant!`,
    },
  ];

  useEffect(() => {
    // Initialise Swiper 
    new window.Swiper('.hero-slider', {
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: { delay: 5000 },
    });
  }, []);

  return (
    <div className="swiper-container hero-slider">
      <div className="swiper-wrapper">
        {slidesData.map((slide, idx) => (
          <Slide
            key={idx}
            date={slide.date}
            backgroundImage={slide.backgroundImage}
            title={slide.title}
          />
        ))}
      </div>

      {/* Pagination et flèches */}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next flex justify-content-center align-items-center">
        <span>
          <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
          </svg>
        </span>
      </div>
      <div className="swiper-button-prev flex justify-content-center align-items-center">
        <span>
          <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
