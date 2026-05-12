import React, { useEffect, useRef, useState } from 'react'
import './Footer.css'

const Footer = () => {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const [openModal, setOpenModal] = useState(null) 
  // null | 'privacy' | 'terms'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const closeModal = () => setOpenModal(null)

  return (
    <>
      <footer
        className={`footer ${isVisible ? 'fade-in' : ''}`}
        ref={footerRef}
      >
        <p className="left-text">© 2024 Un Piccolo Sorriso.</p>
        <p className="center-text">Developed by Echo Solutions</p>

        <ul>
          <li>
            <button onClick={() => setOpenModal('terms')}>
              Uslovi korišćenja
            </button>
          </li>
          <li>
            <button onClick={() => setOpenModal('privacy')}>
              Politika privatnosti
            </button>
          </li>
        </ul>
      </footer>

      {/* ================= MODAL ================= */}

      {openModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            {openModal === 'terms' && (
              <div>
                <h2>Uslovi korišćenja</h2>
                <p>
                  Korišćenjem ovog sajta slažete se sa uslovima korišćenja.
                  Svi podaci su informativnog karaktera. Zadržavamo pravo izmene
                  sadržaja bez prethodne najave.
                </p>
              </div>
            )}

            {openModal === 'privacy' && (
              <div>
                <h2>Politika privatnosti</h2>
                <p>
                  Vaši podaci se koriste isključivo za kontakt i rezervacije.
                  Ne delimo informacije sa trećim licima i čuvamo ih u skladu
                  sa važećim propisima o zaštiti podataka.
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default Footer