import React, { useEffect, useRef, useState } from 'react'
import dark_arrow from '../../assets/dark-arrow.png'
import hero from '../../assets/hero.webp'

const Hero = () => {
  const heroRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()

    const target = document.getElementById('about')

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`hero container ${visible ? 'show' : ''}`}
      aria-label="Hero sekcija"
    >
      <style>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(
            rgba(240, 216, 178, 0.6),
            rgba(8, 0, 58, 0.7)
          );
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
          text-shadow:
            0 0 10px rgba(255,255,255,0.2),
            0 0 20px rgba(255,255,255,0.15);
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
          justify-content: center;
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
          border: 2px solid white;
          z-index: 1;
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
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0.2),
            rgba(255,255,255,0)
          );
          transform: skewX(-20deg);
          transition: left 0.5s;
          z-index: 1;
        }

        .hero-text .btn:hover::before {
          left: 100%;
        }

        .hero-text .btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow:
            0 10px 25px rgba(255,255,255,0.25),
            0 0 20px rgba(255,255,255,0.2);
          background: #ffffff;
        }

        .hero-text .btn:hover img {
          transform: translateX(6px);
        }

        .hero-text .btn:active {
          transform: scale(0.96);
        }

        /* =========================
           ANIMATIONS
        ========================= */

        .hero-title,
        .hero-desc,
        .hero-btn {
          opacity: 0;
        }

        .show .hero-title {
          animation: fadeUp 1s ease forwards;
        }

        .show .hero-desc {
          animation: fadeUp 1s ease forwards;
          animation-delay: 0.3s;
        }

        .show .hero-btn {
          animation: buttonReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.7s;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonReveal {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.1);
            border-radius: 50%;
          }

          40% {
            opacity: 1;
            transform: translateY(0) scale(0.2) rotate(180deg);
            border-radius: 50%;
          }

          70% {
            transform: scale(1.08) rotate(360deg);
            border-radius: 30px;
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
            border-radius: 25px;
          }
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
        <h1 className="hero-title">
          Mesto gde se spajaju uživanje, zabava i porodica!
        </h1>

        <p className="hero-desc">
          Uživajte u savršenoj atmosferi, dok se vaša deca zabavljaju u
          najmodernijoj igraonici u gradu!
        </p>

        <a
          href="#about"
          className="btn hero-btn"
          aria-label="Pogledaj više o nama"
          onClick={handleClick}
        >
          Pogledaj više!

          <img src={dark_arrow} alt="" aria-hidden="true" />
        </a>
      </div>

      <img
        src={hero}
        alt="Dečija igraonica - hero pozadina"
        className="hero-bg"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        width="1920"
        height="1080"
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