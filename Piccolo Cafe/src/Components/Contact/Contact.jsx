import React, { useState } from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    Ime: '',
    'E-mail': '',
    Telefon: '',
    'Željeni datum': '',
    'Očekivani broj dece': '',
    'Očekivani broj roditelja': '',
    Vreme: '',
    Meni: '',
    Napomena: ''
  })

  const [statusMessage, setStatusMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatusMessage('Slanje...')

    if (new Date(formData['Željeni datum']) < new Date().setHours(0, 0, 0, 0)) {
      setStatusMessage('Datum mora biti danas ili u budućnosti.')
      setLoading(false)
      return
    }

    try {
      const data = new FormData()

      for (const key in formData) {
        data.append(key, formData[key])
      }

      data.append('access_key', '19536fb6-d2b1-4606-a434-39921e59bcd4')

      // 🔥 custom email identity
      data.append('subject', 'Nova rezervacija termina - Piccolo')
      data.append('from_name', 'Piccolo Kontakt Forma')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })

      const result = await response.json()

      if (result.success) {
        setStatusMessage('Poruka uspešno poslata! Uskoro vas kontaktiramo.')
        setFormData({
          Ime: '',
          'E-mail': '',
          Telefon: '',
          'Željeni datum': '',
          'Očekivani broj dece': '',
          'Očekivani broj roditelja': '',
          Vreme: '',
          Meni: '',
          Napomena: ''
        })
      } else {
        setStatusMessage(result.message || 'Došlo je do greške.')
      }
    } catch (error) {
      setStatusMessage('Greška pri slanju forme.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      <div className="contact">

        {/* LEFT */}
        <div className="contact-col">
          <h3>
            Kontaktirajte nas <img src={msg_icon} alt="" />
          </h3>

          <p>Želite da zakažete proslavu rođendana svog deteta?</p>

          <p>
            To možete učiniti putem forme. Odaberite datum, vreme i meni po želji.
          </p>

          <ul>
            <li><img src={mail_icon} alt="" /> info@piccolo.com</li>
            <li><img src={phone_icon} alt="" /> +38165 684-05-12</li>
            <li><img src={location_icon} alt="" /> Niš, Srbija</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="contact-col">

          <form onSubmit={onSubmit}>

            <label>Ime:</label>
            <input name="Ime" value={formData.Ime} onChange={onChange} required />

            <label>Email:</label>
            <input name="E-mail" type="email" value={formData['E-mail']} onChange={onChange} required />

            <label>Telefon:</label>
            <input name="Telefon" value={formData.Telefon} onChange={onChange} required />

            <label>Datum:</label>
            <input type="date" name="Željeni datum" value={formData['Željeni datum']} onChange={onChange} required />

            <label>Broj dece:</label>
            <input type="number" name="Očekivani broj dece" value={formData['Očekivani broj dece']} onChange={onChange} />

            <label>Broj roditelja:</label>
            <input type="number" name="Očekivani broj roditelja" value={formData['Očekivani broj roditelja']} onChange={onChange} />

            {/* TIME */}
            <fieldset className="time-box">
              <legend>Izaberite termin</legend>

              <div className="alignment">
                {['14H', '16H', '18H', '20H'].map((v) => (
                  <label key={v}>
                    <input
                      type="radio"
                      name="Vreme"
                      value={v}
                      checked={formData.Vreme === v}
                      onChange={onChange}
                      required
                    />
                    {v.slice(0, -1)}:00
                  </label>
                ))}
              </div>
            </fieldset>

            {/* MENU DROPDOWN */}
            <label>Odaberite meni:</label>
            <select name="Meni" value={formData.Meni} onChange={onChange} required>
              <option value="">Izaberite</option>
              <option value="Grickalice">Grickalice</option>
              <option value="Ono kao nekad">Ono kao nekad</option>
              <option value="Kiflice">Kiflice</option>
              <option value="Pica">Pica</option>
              <option value="Piletina">Piletina</option>
              <option value="Mini Burgeri">Mini Burgeri</option>
            </select>

            <label>Napomena:</label>
            <textarea name="Napomena" value={formData.Napomena} onChange={onChange} />

            <button className="btn dark-btn" disabled={loading}>
              {loading ? 'Slanje...' : 'Pošalji'}
              <img src={white_arrow} alt="" />
            </button>

          </form>

          <span>{statusMessage}</span>

        </div>
      </div>
    </section>
  )
}

export default Contact