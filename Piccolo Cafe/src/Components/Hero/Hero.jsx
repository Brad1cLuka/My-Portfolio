import React from 'react'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.getElementById('about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero container" aria-label="Hero sekcija">
      {/* Inline critical style */}
      <style>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(rgba(240, 216, 178, 0.6), rgba(8, 0, 58, 0.7));
        }

        .hero-text {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          padding: 0 15px;
          box-sizing: border-box;
          color: white;
        }

        .hero-text h1 {
          font-size: 60px;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        .hero-text p {
          max-width: 700px;
          margin: 10px auto 20px;
          line-height: 1.4;
          font-size: 18px;
        }

        .hero-text .btn {
          display: inline-flex;
          align-items: center;
          background-color: white;
          color: black;
          padding: 12px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .hero-text .btn img {
          width: 20px;
          height: 20px;
          margin-left: 10px;
          transition: transform 0.3s ease;
        }

        .hero-text .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 150%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
          transform: skewX(-20deg);
          transition: left 0.5s;
          z-index: 1;
        }

        .hero-text .btn:hover::before {
          left: 100%;
        }

        .hero-text .btn:hover img {
          transform: translateX(5px);
        }

        @media (max-width: 850px) {
          .hero-text h1 {
            font-size: 40px;
          }
        }

        @media (max-width: 650px) {
          .hero-text h1 {
            font-size: 30px;
          }

          .hero-text p {
            font-size: 14px;
            margin: 15px auto 30px;
          }

          .hero-text .btn {
            font-size: 14px;
            padding: 10px 18px;
          }
        }
      `}</style>

      <div className="hero-text">
        <h1>Mesto gde se spajaju uživanje, zabava i porodica!</h1>
        <p>
          Uživajte u savršenoj atmosferi, dok se vaša deca zabavljaju u najmodernijoj igraonici u gradu!
        </p>
        <a
          href="#about"
          className="btn"
          aria-label="Pogledaj više o nama"
          onClick={handleClick}
        >
          Pogledaj više!
          <img src={dark_arrow} alt="" aria-hidden="true" />
        </a>
      </div>

      <img
        src="/assets/hero.webp"
        alt="Dečija igraonica - hero pozadina"
        className="hero-bg"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
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
