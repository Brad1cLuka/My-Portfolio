import React, { useEffect, useRef, useState } from 'react'
import './Footer.css'

const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // samo jednom animiraj, pa prestani da gledaš
        }
      },
      { threshold: 0.1 }
    )
    if (footerRef.current) {
      observer.observe(footerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      className={`footer ${isVisible ? 'fade-in' : ''}`}
      role="contentinfo"
      ref={footerRef}
    >
      <p className="left-text">© 2024 Un Piccolo Sorriso.</p>
      <p className="center-text">Developed by. Echo Solutions</p>
      <ul>
        <li>
          <a href="/uslovi-koriscenja" tabIndex={0}>
            Uslovi korišćenja
          </a>
        </li>
        <li>
          <a href="/politika-privatnosti" tabIndex={0}>
            Politika privatnosti
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
