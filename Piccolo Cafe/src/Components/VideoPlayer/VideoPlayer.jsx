import React, { useRef } from 'react'
import './VideoPlayer.css'

import pice1 from '../../assets/pice-meni-1.webp'
import pice2 from '../../assets/pice-meni-2.webp'
import pice3 from '../../assets/pice-meni-3.webp'
import pice4 from '../../assets/pice-meni-4.webp'
import pice5 from '../../assets/pice-meni-5.webp'

import hrana1 from '../../assets/hrana-meni-1.webp'
import hrana2 from '../../assets/hrana-meni-2.webp'
import hrana3 from '../../assets/hrana-meni-3.webp'
import hrana4 from '../../assets/hrana-meni-4.webp'
import hrana5 from '../../assets/hrana-meni-5.webp'

import igraonica1 from '../../assets/igraonica-meni-1.webp'
import igraonica2 from '../../assets/igraonica-meni-2.webp'

const galleries = {
  pice: [pice1, pice2, pice3, pice4, pice5],
  hrana: [hrana1, hrana2, hrana3, hrana4, hrana5],
  igraonica: [igraonica1, igraonica2]
}

const VideoPlayer = ({ activeGallery, imageIndex, setActiveGallery }) => {
  const player = useRef(null)

  if (!activeGallery) return null

  const images = galleries[activeGallery]
  const currentIndex = imageIndex

  const goPrev = () => {
    if (currentIndex > 0) {
      setActiveGallery(activeGallery, currentIndex - 1)
    }
  }

  const goNext = () => {
    if (currentIndex < images.length - 1) {
      setActiveGallery(activeGallery, currentIndex + 1)
    }
  }

  const closePlayer = (e) => {
    if (e.target === player.current) {
      setActiveGallery(null, 0)
    }
  }

  return (
    <div
      className="video-player"
      ref={player}
      onClick={closePlayer}
      role="dialog"
      aria-modal="true"
      aria-label="Galerija slika"
      tabIndex={-1}
    >
      <div className="viewer">
        {currentIndex > 0 && (
          <button
            className="nav left"
            onClick={goPrev}
            aria-label="Prethodna slika"
          >
            ←
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`${activeGallery} - slika ${currentIndex + 1}`}
          className="main-image"
        />

        {currentIndex < images.length - 1 && (
          <button
            className="nav right"
            onClick={goNext}
            aria-label="Sledeća slika"
          >
            →
          </button>
        )}
      </div>

      <div className="info-bar" aria-live="polite" aria-atomic="true">
        {`${activeGallery.toUpperCase()} - ${currentIndex + 1} / ${images.length}`}
      </div>

      <button
        className="close-button"
        onClick={() => setActiveGallery(null, 0)}
        aria-label="Zatvori galeriju"
      >
        Zatvori
      </button>
    </div>
  )
}

export default VideoPlayer
