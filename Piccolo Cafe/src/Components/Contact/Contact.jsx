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

      data.append('subject', 'Nova rezervacija termina - Piccolo')
      data.append('from_name', 'Piccolo rezervacije')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })

      const result = await response.json()

      if (result.success) {
        setStatusMessage('Poruka uspešno poslata! Uskoro cemo vas kontaktirati.')
        setFormData({
          Ime: '',
          'E-mail': '',
          Telefon: '',
          'Zeljeni datum': '',
          'Ocekivani broj dece': '',
          'Ocekivani broj roditelja': '',
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

          <div className="contact-map">
            <iframe
              src="<iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1008.2277586980807!2d21.92457943456194!3d43.3355655504098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x4755b1c1a70d0e8f%3A0x719d1feee9aa2b5f!2sPICCOLO%20CAFE%2C%20Bulevar%20Svetog%20Pantelejmona%2091b%2C%20%D0%9D%D0%B8%D1%88%2018000!3m2!1d43.3356837!2d21.925126499999998!4m5!1s0x4755b1c1a70d0e8f%3A0x719d1feee9aa2b5f!2sPICCOLO%20CAFE%2C%20Bulevar%20Svetog%20Pantelejmona%2091b%2C%20%D0%9D%D0%B8%D1%88%2018000!3m2!1d43.3356837!2d21.925126499999998!5e1!3m2!1ssr!2srs!4v1778665844143!5m2!1ssr!2srs"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokacija"
            ></iframe>
          </div>
        </div>

        <div className="contact-col">

          <form onSubmit={onSubmit}>

            <label htmlFor="ime">Ime:</label>
            <input
              id="ime"
              name="Ime"
              value={formData.Ime}
              onChange={onChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="E-mail"
              type="email"
              value={formData['E-mail']}
              onChange={onChange}
              required
            />

            <label htmlFor="telefon">Telefon:</label>
            <input
              id="telefon"
              name="Telefon"
              value={formData.Telefon}
              onChange={onChange}
              required
            />

            <label htmlFor="datum">Datum:</label>
            <input
              id="datum"
              type="date"
              name="Željeni datum"
              value={formData['Željeni datum']}
              onChange={onChange}
              required
            />

            <label htmlFor="broj-dece">Broj dece:</label>
            <input
              id="broj-dece"
              type="number"
              name="Očekivani broj dece"
              value={formData['Očekivani broj dece']}
              onChange={onChange}
            />

            <label htmlFor="broj-roditelja">Broj roditelja:</label>
            <input
              id="broj-roditelja"
              type="number"
              name="Očekivani broj roditelja"
              value={formData['Očekivani broj roditelja']}
              onChange={onChange}
            />

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

            <label htmlFor="meni">Odaberite meni:</label>
            <select
              id="meni"
              name="Meni"
              value={formData.Meni}
              onChange={onChange}
              required
            >
              <option value="">Izaberite</option>
              <option value="Grickalice">Grickalice</option>
              <option value="Ono kao nekad">Ono kao nekad</option>
              <option value="Kiflice">Kiflice</option>
              <option value="Pica">Pica</option>
              <option value="Piletina">Piletina</option>
              <option value="Mini Burgeri">Mini Burgeri</option>
            </select>

            <label htmlFor="napomena">Napomena:</label>
            <textarea
              id="napomena"
              name="Napomena"
              value={formData.Napomena}
              onChange={onChange}
            />

            <button className="btn dark-btn" disabled={loading}>
              {loading ? 'Slanje...' : 'Pošalji'}
              <img src={white_arrow} alt="" />
            </button>

          </form>

          <span
  className={
    statusMessage.includes('uspešno')
      ? 'success-message'
      : 'error-message'
  }
>
  {statusMessage}
</span>

        </div>
      </div>
    </section>
  )
}

export default Contact