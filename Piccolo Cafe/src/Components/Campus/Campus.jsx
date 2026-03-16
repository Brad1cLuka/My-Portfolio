import React, { useState, useEffect, useRef } from 'react';
import './Campus.css';

import gallery_1 from '../../assets/kafic-1.webp';
import gallery_2 from '../../assets/kafic-2.webp';
import gallery_3 from '../../assets/kafic-3.webp';
import gallery_4 from '../../assets/kafic-4.webp';
import gallery_5 from '../../assets/kafic-5.webp';
import gallery_6 from '../../assets/kafic-6.webp';
import gallery_7 from '../../assets/kafic-7.webp';
import gallery_8 from '../../assets/igr1.webp';
import gallery_9 from '../../assets/igr2.webp';
import gallery_10 from '../../assets/igr3.webp';
import gallery_11 from '../../assets/igr4.webp';
import gallery_12 from '../../assets/igr5.webp';

import white_arrow from '../../assets/white-arrow.png';

const allImages = [
  gallery_1, gallery_2, gallery_3, gallery_4,
  gallery_5, gallery_6, gallery_7, gallery_8,
  gallery_9, gallery_10, gallery_11, gallery_12
];

const Campus = () => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const closeBtnRef = useRef(null);

  const imagesToShow = expanded ? allImages : allImages.slice(0, 4);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + allImages.length) % allImages.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % allImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev(e);
      if (e.key === 'ArrowRight') goNext(e);
    };
    if (lightboxOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  useEffect(() => {
    if (lightboxOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [lightboxOpen]);

  return (
    <section id="campus">
    <div className='campus'>
      <div className="gallery">
        {imagesToShow.map((img, idx) => (
          <img
            key={idx}
            loading="lazy"
            src={img}
            alt={`Slika kafića ${idx + 1}`}
            onClick={() => openLightbox(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      <button
        className='btn dark-btn'
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Prikaži manje slika" : "Prikaži još slika"}
      >
        {expanded ? 'Prikaži manje' : 'Još fotografija'} <img src={white_arrow} alt="Strelica" />
      </button>

      {lightboxOpen && (
        <div
          className='lightbox-overlay'
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Galerija slika, prikazana slika ${currentIndex + 1} od ${allImages.length}`}
        >
          <button
            ref={closeBtnRef}
            className='lightbox-close'
            onClick={closeLightbox}
            aria-label="Zatvori galeriju"
          >
            &times;
          </button>

          <div className="lightbox-image-container">
            <button className='lightbox-prev' onClick={goPrev} aria-label="Prethodna slika">
              &#10094;
            </button>
            <img
              className='lightbox-img'
              src={allImages[currentIndex]}
              alt={`Uvećana slika ${currentIndex + 1}`}
              loading="lazy"
            />
            <button className='lightbox-next' onClick={goNext} aria-label="Sledeća slika">
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
    </section>
  );
};

export default Campus;
