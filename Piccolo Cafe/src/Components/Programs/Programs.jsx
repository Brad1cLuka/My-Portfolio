import React from 'react'
import './Programs.css'
import program_1 from '../../assets/pice-meni.jpg'
import program_2 from '../../assets/hrana-meni.jpg'
import program_3 from '../../assets/igraonica-meni.jpg'
import program_icon_1 from '../../assets/book-icon.png'

const Programs = ({ setActiveGallery }) => {
  return (
    <section id="program" className="programs" aria-label="Sekcija programa">
      <article className="program">
        <img src={program_1} alt="Piće meni" />
        <div className="caption" onClick={() => setActiveGallery('pice', 0)} role="button" tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveGallery('pice', 0)}>
          <img src={program_icon_1} alt="Ikona knjige" aria-hidden="true" loading="lazy"/>
          <p>Piće</p>
        </div>
      </article>

      <article className="program">
        <img src={program_2} alt="Hrana meni" />
        <div className="caption" onClick={() => setActiveGallery('hrana', 0)} role="button" tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveGallery('hrana', 0)}>
          <img src={program_icon_1} alt="Ikona knjige" aria-hidden="true"  loading="lazy"/>
          <p>Hrana</p>
        </div>
      </article>

      <article className="program">
        <img src={program_3} alt="Igraonica meni" />
        <div className="caption" onClick={() => setActiveGallery('igraonica', 0)} role="button" tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveGallery('igraonica', 0)}>
          <img src={program_icon_1} alt="Ikona knjige" aria-hidden="true" loading="lazy"/>
          <p>Igraonica</p>
        </div>
      </article>
    </section>
  )
}

export default Programs
