import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo_beli.webp'

const Navbar = () => {
  const [sticky, setSticky] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setMobileMenu(prev => !prev)
  }

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setMobileMenu(false)

    const target = document.getElementById(id)

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}>
        <img src={logo} alt="Logo Piccolo" className="logo" />
      </a>

      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li>
          <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}>
            Početna
          </a>
        </li>

        <li>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
            O nama
          </a>
        </li>

        <li>
          <a href="#program" onClick={(e) => handleLinkClick(e, 'program')}>
            Meni
          </a>
        </li>

        <li>
          <a href="#campus" onClick={(e) => handleLinkClick(e, 'campus')}>
            Galerija
          </a>
        </li>

        <li>
          <a
            href="#testimonials"
            onClick={(e) => handleLinkClick(e, 'testimonials')}
          >
            Utisci posetioca
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="btn"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Zakazivanje termina
          </a>
        </li>
      </ul>

      <div
        className={`hamburger ${mobileMenu ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar