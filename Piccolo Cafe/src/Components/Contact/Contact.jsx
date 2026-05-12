import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    ime: '',
    email: '',
    telefon: '',
    datum: '',
    odrasli: '',
    deca: '',
    poruka: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()

    data.append('access_key', '19536fb6-d2b1-4606-a434-39921e59bcd4')

    // 👇 EMAIL HEADER PERSONALIZACIJA
    data.append('from_name', 'Piccolo Zakazivanje')
    data.append('subject', 'Zakazivanje termina - Piccolo')
    data.append('replyto', form.email)

    // 👇 PODACI
    data.append('Ime', form.ime)
    data.append('Email', form.email)
    data.append('Telefon', form.telefon)
    data.append('Datum', form.datum)
    data.append('Odrasli', form.odrasli)
    data.append('Deca', form.deca)
    data.append('Poruka', form.poruka)

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })

    setLoading(false)
    setSent(true)

    setTimeout(() => {
      setSent(false)
      setForm({
        ime: '',
        email: '',
        telefon: '',
        datum: '',
        odrasli: '',
        deca: '',
        poruka: '',
      })
    }, 2500)
  }

  return (
    <section id="contact" className="contact">

      <div className="contact-col">
        <h3>Kontaktirajte nas</h3>

        <form onSubmit={handleSubmit}>

          <label>Ime i prezime</label>
          <input
            name="ime"
            value={form.ime}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Telefon</label>
          <input
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            required
          />

          <label>Željeni datum</label>
          <input
            type="date"
            name="datum"
            value={form.datum}
            onChange={handleChange}
            required
          />

          <label>Broj odraslih</label>
          <input
            type="number"
            name="odrasli"
            value={form.odrasli}
            onChange={handleChange}
          />

          <label>Broj dece</label>
          <input
            type="number"
            name="deca"
            value={form.deca}
            onChange={handleChange}
          />

          <label>Poruka</label>
          <textarea
            name="poruka"
            value={form.poruka}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Šaljem...' : sent ? '✔ Poslato' : 'Pošalji'}
          </button>

        </form>
      </div>

    </section>
  )
}

export default Contact