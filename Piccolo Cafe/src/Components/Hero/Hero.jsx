import React from 'react'
import dark_arrow from '../../assets/dark-arrow.png'
import hero from '../../assets/hero.webp'

const Hero = () => {

  const handleClick = (e) => {
    e.preventDefault()
    const target = document.getElementById('about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero container">

      <div className="hero-text">
        <h1>Mesto gde se spajaju uživanje, zabava i porodica!</h1>
        <p>
          Uživajte u savršenoj atmosferi dok se deca igraju u igraonici.
        </p>

        <a href="#about" className="btn" onClick={handleClick}>
          Pogledaj više!
          <img src={dark_arrow} alt="" />
        </a>
      </div>

      <img
        src={hero}
        alt="Hero Piccolo"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        width="1920"
        height="1080"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      />

    </section>
  )
}

export default Hero