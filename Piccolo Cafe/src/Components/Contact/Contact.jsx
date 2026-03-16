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

    // Provera da li je datum u budućnosti
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

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      const result = await response.json()

      if (result.success) {
        setStatusMessage(
          'Poruka uspešno poslata! Uskoro ćete dobiti odgovor na mejl koji ste naveli u formi!'
        )
        setFormData({
          Ime: '',
          'E-mail': '',
          Telefon: '',
          'Željeni datum': '',
          'Očekivani broj dece': '',
          'Očekivani broj roditelja': '',
          Vreme: '',
          Napomena: ''
        })
      } else {
        setStatusMessage(result.message || 'Došlo je do greške.')
        console.error('Greška', result)
      }
    } catch (error) {
      setStatusMessage('Greška pri slanju forme. Molimo pokušajte kasnije.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      <div className="contact">
        <div className="contact-col">
          <h3>
            Kontaktirajte nas <img src={msg_icon} alt="Ikona poruke" />
          </h3>
          <p>Želite da zakažete proslavu rođendana svog deteta?</p>
          <p>
            To možete učiniti putem kontakt-forme sa desne strane! Takođe naše
            kontakt informacije možete videti i ispod!
          </p>
          <ul>
            <li>
              <img src={mail_icon} alt="Email ikona" />
              info@piccolo.com
            </li>
            <li>
              <img src={phone_icon} alt="Telefon ikona" />
              +38165 684-05-12
            </li>
            <li>
              <img src={location_icon} alt="Lokacija ikona" />
              Bul. Svetog Pantelejmona 91b, Niš, Srbija
            </li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="Ime">Vaše ime:</label>
            <input
              type="text"
              id="Ime"
              name="Ime"
              placeholder="Unesite svoje ime"
              required
              value={formData.Ime}
              onChange={onChange}
            />

            <label htmlFor="E-mail">Vaš e-mail:</label>
            <input
              type="email"
              id="E-mail"
              name="E-mail"
              placeholder="Unesite svoj e-mail"
              required
              value={formData['E-mail']}
              onChange={onChange}
            />

            <label htmlFor="Telefon">Vaš broj telefona:</label>
            <input
              type="tel"
              id="Telefon"
              name="Telefon"
              placeholder="Unesite svoj broj telefona"
              required
              value={formData.Telefon}
              onChange={onChange}
              pattern="^\+?[0-9\s\-]{7,15}$"
              title="Unesite validan broj telefona"
            />

            <label htmlFor="Željeni datum">Unesite datum koji biste želeli:</label>
            <input
              type="date"
              id="Željeni datum"
              name="Željeni datum"
              required
              value={formData['Željeni datum']}
              onChange={onChange}
            />

            <label htmlFor="Očekivani broj dece">Unesite očekivani broj dece:</label>
            <input
              type="number"
              id="Očekivani broj dece"
              name="Očekivani broj dece"
              placeholder="Unesite očekivani broj dece"
              min={0}
              required
              value={formData['Očekivani broj dece']}
              onChange={onChange}
            />

            <label htmlFor="Očekivani broj roditelja">
              Unesite očekivani broj roditelja:
            </label>
            <input
              type="number"
              id="Očekivani broj roditelja"
              name="Očekivani broj roditelja"
              placeholder="Unesite očekivani broj roditelja"
              min={0}
              required
              value={formData['Očekivani broj roditelja']}
              onChange={onChange}
            />

            <fieldset>
              <legend>Izaberite željeno vreme za proslavu</legend>
              <div className="alignment" role="radiogroup" aria-required="true">
                {['14H', '16H', '18H', '20H'].map((v) => (
                  <label key={v} style={{ marginRight: '15px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="Vreme"
                      value={v}
                      required
                      checked={formData.Vreme === v}
                      onChange={onChange}
                    />
                    <span>{v.slice(0, -1)}:00</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label htmlFor="Napomena">Napomena:</label>
            <textarea
              id="Napomena"
              name="Napomena"
              rows="6"
              placeholder="Poruka"
              required
              value={formData.Napomena}
              onChange={onChange}
            ></textarea>

            <button type="submit" className="btn dark-btn" disabled={loading}>
              {loading ? 'Slanje...' : 'Pošalji poruku'} <img src={white_arrow} alt="strelica" />
            </button>
          </form>
          <span
            aria-live="polite"
            role="status"
            style={{ marginTop: '1rem', display: 'block' }}
          >
            {statusMessage}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Contact
