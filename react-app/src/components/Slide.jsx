import React from 'react';

export default function Slide({ date, backgroundImage, title }) {
  return (
    <div
      className="swiper-slide"
      data-date={date}
      style={{ background: `url('${backgroundImage}') no-repeat` }}
    >
      <div className="hero-content">
        <div className="container">
          <div className="row">
            <div className="col flex flex-column justify-content-center">
              <div className="entry-header">
                <h2 className="entry-title" dangerouslySetInnerHTML={{ __html: title }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
