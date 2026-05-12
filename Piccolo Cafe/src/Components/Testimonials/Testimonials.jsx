import React, { useRef, useState } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonials = () => {
  const slider = useRef()

  const [index, setIndex] = useState(0)

  const [openForm, setOpenForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    ime: '',
    tekst: '',
  })

  const maxIndex = 3

  const update = (i) => {
    slider.current.style.transform = `translateX(-${i * 100}%)`
  }

  const slideForward = () => {
    if (index < maxIndex) {
      const newIndex = index + 1
      setIndex(newIndex)
      update(newIndex)
    }
  }

  const slideBackward = () => {
    if (index > 0) {
      const newIndex = index - 1
      setIndex(newIndex)
      update(newIndex)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('access_key', '19536fb6-d2b1-4606-a434-39921e59bcd4')
    data.append('Ime', form.ime)
    data.append('Recenzija', form.tekst)

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })

      setLoading(false)
      setSent(true)

      setTimeout(() => {
        setOpenForm(false)
        setSent(false)
        setForm({ ime: '', tekst: '' })
      }, 2000)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <section id="testimonials">
      <div className="testimonials">

        <img
          src={next_icon}
          alt=""
          className="next-btn"
          onClick={slideForward}
        />

        <img
          src={back_icon}
          alt=""
          className="back-btn"
          onClick={slideBackward}
        />

        <div className="slider">
          <ul ref={slider}>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_1} alt="" />
                  <div>
                    <h3>Milica Nikolić</h3>
                    <span>Leskovac</span>
                  </div>
                </div>
                <p>
                  Dolazim iz Leskovca i svaki put kada smo u Nišu...
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_3} alt="" />
                  <div>
                    <h3>Jelena Ilić</h3>
                    <span>Niš</span>
                  </div>
                </div>
                <p>
                  Igraonica je savršeno organizovana...
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_2} alt="" />
                  <div>
                    <h3>Stefan Jovanović</h3>
                    <span>Beograd</span>
                  </div>
                </div>
                <p>
                  Oduševljeni smo posetom Piccolo...
                </p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_4} alt="" />
                  <div>
                    <h3>Marko Petrović</h3>
                    <span>Niš</span>
                  </div>
                </div>
                <p>
                  Savršeno mesto za decu i roditelje...
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* BUTTON */}
        <button
          className="btn dark-btn"
          onClick={() => setOpenForm(!openForm)}
        >
          Podeli svoje utiske
        </button>

        {/* FORM */}
        {openForm && (
          <div className="review-form">
            {!sent ? (
              <form onSubmit={handleSubmit}>
                <input
                  name="ime"
                  placeholder="Ime i prezime"
                  value={form.ime}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="tekst"
                  placeholder="Tvoj utisak"
                  value={form.tekst}
                  onChange={handleChange}
                  required
                />

                <button type="submit" disabled={loading}>
                  {loading ? 'Šaljem...' : 'Pošalji'}
                </button>
              </form>
            ) : (
              <p className="success">✔ Poslato!</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials