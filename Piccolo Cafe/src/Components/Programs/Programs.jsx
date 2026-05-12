import React, { useEffect, useRef, useState } from 'react'
import './Programs.css'

import program_1 from '../../assets/pice-meni.jpg'
import program_2 from '../../assets/hrana-meni.jpg'
import program_3 from '../../assets/igraonica-meni.jpg'

import program_icon_1 from '../../assets/book-icon.png'

const Programs = ({ setActiveGallery }) => {
  const [activeCard, setActiveCard] = useState(0)

  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            window.innerWidth <= 650
          ) {
            const index = Number(
              entry.target.dataset.index
            )

            setActiveCard(index)
          }
        })
      },
      {
        threshold: 0.7,
      }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const programs = [
    {
      image: program_1,
      title: 'Piće',
      type: 'pice',
    },
    {
      image: program_2,
      title: 'Hrana',
      type: 'hrana',
    },
    {
      image: program_3,
      title: 'Igraonica',
      type: 'igraonica',
    },
  ]

  return (
    <section
      id='program'
      className='programs'
      aria-label='Sekcija programa'
    >
      {programs.map((item, index) => (
        <article
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          data-index={index}
          className={`program ${
            activeCard === index ? 'mobile-active' : ''
          }`}
        >
          <img
            src={item.image}
            alt={`${item.title} meni`}
          />

          <div
            className='caption'
            onClick={() =>
              setActiveGallery(item.type, 0)
            }
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === 'Enter' ||
                e.key === ' ') &&
              setActiveGallery(item.type, 0)
            }
          >
            <img
              src={program_icon_1}
              alt='Ikona knjige'
              aria-hidden='true'
              loading='lazy'
            />

            <p>{item.title}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Programs