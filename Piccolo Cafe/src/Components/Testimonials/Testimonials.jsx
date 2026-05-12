import React, { useRef, useState, useEffect } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonials = () => {
  const slider = useRef(null)
  const tx = useRef(0)

  const [openForm, setOpenForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [submittedOnce, setSubmittedOnce] = useState(false)

  const [form, setForm] = useState({
    ime: '',
    tekst: ''
  })

  useEffect(() => {
    if (slider.current) {
      slider.current.style.willChange = 'transform'
    }
  }, [])

  const slideForward = () => {
    if (tx.current > -50) {
      tx.current -= 25
      slider.current.style.transform = `translateX(${tx.current}%)`
    }
  }

  const slideBackward = () => {
    if (tx.current < 0) {
      tx.current += 25
      slider.current.style.transform = `translateX(${tx.current}%)`
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('access_key', '19536fb6-d2b1-4606-a434-39921e59bcd4')
    data.append('Ime', form.ime)
    data.append('Recenzija', form.tekst)

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })

    setLoading(false)
    setSent(true)
    setSubmittedOnce(true)

    setTimeout(() => {
      setOpenForm(false)
      setSent(false)
      setForm({ ime: '', tekst: '' })
    }, 2000)
  }

  return (
    <section id="testimonials">
      <div className="testimonials">

        <img src={next_icon} className="next-btn" onClick={slideForward} />
        <img src={back_icon} className="back-btn" onClick={slideBackward} />

        <div className="slider">
          <ul ref={slider}>
            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_1} />
                  <div><h3>Milica Nikolić</h3></div>
                </div>
                <p>Dolazim iz Leskovca i svaki put kada smo u Nišu, neizostavno svratimo u Piccolo...</p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_3} />
                  <div><h3>Jelena Ilić</h3></div>
                </div>
                <p>Živim u Nišu i često dolazim u Piccolo sa mojom decom...</p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_2} />
                  <div><h3>Stefan Jovanović</h3></div>
                </div>
                <p>Kada sam bio u Nišu, sa porodicom smo posetili Piccolo...</p>
              </div>
            </li>

            <li>
              <div className="slide">
                <div className="user-info">
                  <img src={user_4} />
                  <div><h3>Marko Petrović</h3></div>
                </div>
                <p>Piccolo igraonica je pravo mesto za moju decu...</p>
              </div>
            </li>
          </ul>
        </div>

        {!submittedOnce && !sent && (
          <button className="btn dark-btn" onClick={() => setOpenForm(!openForm)}>
            Podeli svoje utiske
          </button>
        )}

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