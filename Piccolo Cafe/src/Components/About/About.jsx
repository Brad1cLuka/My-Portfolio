import React, { useEffect, useRef, useState } from 'react'
import kaficImgWebp from '../../assets/kafic-1.webp'
import igraonicaImgWebp from '../../assets/igraonica-12.webp'
import './About.css'

const FadeInSection = ({ children }) => {
  const ref = useRef(null)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`fade-section ${isVisible ? 'fade-in' : ''}`}
    >
      {children}
    </section>
  )
}

const About = () => {
  return (
    <>
      <FadeInSection>
        <section id="about" className="about" aria-labelledby="kafic-title">
          <div className="about-left">
            <picture>
              <source srcSet={kaficImgWebp} type="image/webp" />
              <img
                src={kaficImgWebp}
                alt="Kafić Piccolo enterijer"
                className="about-img"
                loading="lazy"
                width="600"
                height="400"
                decoding="async"
              />
            </picture>
          </div>
          <div className="about-right">
            <h3>UN PICCOLO SORRISO</h3>
            <h2 id="kafic-title">O kafiću</h2>
            <p>Adresiran na Bulevaru Svetog Pantelejmona 91b, Piccolo je više od običnog kafića – to je mesto gde se spajaju ljubav prema dobroj hrani, prijatnoj atmosferi i veselju celokupne porodice. U srcu našeg kafića nalazi se ljubazno i posvećeno osoblje koje je uvek tu da vam pruži nezaboravno iskustvo, bilo da uživate u mirnom popodnevu uz kafu ili se opuštate s prijateljima.</p>
            <p>Naši talentovani kuvari pripremaju jela koja nisu samo ukusna, već i prava umetnost – sve sa pažnjom i ljubavlju, koristeći samo najkvalitetnije sastojke. Bilo da birate brzo uživanje u ukusnom desertu ili želite da uživate u kompletnom obroku, Piccolo će zadovoljiti i najzahtevnije gurmane.</p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="about reverse" aria-labelledby="igraonica-title">
          <div className="about-left">
            <h3>UN PICCOLO SORRISO</h3>
            <h2 id="igraonica-title">O igraonici</h2>
            <p>Za naše mlađe goste, kafić Piccolo je pravo carstvo zabave! Naša igraonica prostire se na impresivnih 300 kvadratnih metara, čineći je najvećom i najmodernijom igraonicom u gradu. Ovaj prostor je pun avantura, izazova i zabavnih sadržaja koji omogućavaju deci da uživaju u kreativnoj igri, dok razvijaju svoje sposobnosti i maštu. Bilo da se penju, trče ili rešavaju interaktivne zadatke, naša igraonica pruža bezbedno i stimulativno okruženje za decu svih uzrasta.</p>
            <p>Mališani će uživati u svakom trenutku provedenom u ovoj jedinstvenoj oazi zabave, dok se naši pažljivo obučeni animatori brinu o njima i vode ih kroz sve aktivnosti, omogućujući roditeljima da se opuste i uživaju u svom vremenu u kafiću.</p>
            <p>U Piccolu, svaki trenutak je prilika da se opustite, uživate u životu i stvorite nezaboravne uspomene sa voljenima. Posetite nas i doživite pravu čaroliju koja je, baš kao i naš kafić, uvek tu da vas usreći.</p>
          </div>
          <div className="about-right">
            <picture>
              <source srcSet={igraonicaImgWebp} type="image/webp" />
              <img
                src={igraonicaImgWebp}
                alt="Igraonica Piccolo - prostor za decu"
                className="about-img"
                loading="lazy"
                width="600"
                height="400"
                decoding="async"
              />
            </picture>
          </div>
        </section>
      </FadeInSection>
    </>
  )
}

export default About
