import React, { useRef, useState } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonials = () => {

    const slider = useRef();
    let tx = 0;

    const [openForm, setOpenForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const [form, setForm] = useState({
      ime: '',
      tekst: ''
    })

    const slideForward = ()=>{
        if(tx >-50){
            tx -=25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }
    
    const slideBackward = ()=>{
        if(tx < 0){
            tx +=25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
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

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })

      setLoading(false)
      setSent(true)

      setTimeout(() => {
        setOpenForm(false)
        setSent(false)
        setForm({ ime: '', tekst: '' })
      }, 2000)
    }

  return (
    <section id="testimonials">
    <div className='testimonials'> 

        <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
        <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>

        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_1} alt="" loading="lazy"/>
                            <div>
                                <h3>Milica Nikolić</h3>
                            </div>
                        </div>
                        <p>
                            Dolazim iz Leskovca i svaki put kada smo u Nišu, neizostavno svratimo u Piccolo. Moja deca se uvek rado igraju u igraonici, dok ja mogu da popijem dobru kafu i pojedem nešto ukusno. Mesto je izuzetno prijatno i idealno za porodični odmor.
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_3} alt="" loading="lazy"/>
                            <div>
                                <h3>Jelena Ilić</h3>
                            </div>
                        </div>
                        <p>
                            Živim u Nišu i često dolazim u Piccolo sa mojom decom. Igraonica je savršeno organizovana, sa mnogo zanimljivih i sigurnih aktivnosti za mališane. Dok se deca igraju, mogu da uživam u ukusnoj hrani i piću, što je idealno za izlazak sa porodicom.
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_2} alt="" loading="lazy"/>
                            <div>
                                <h3>Stefan Jovanović</h3>
                            </div>
                        </div>
                        <p>
                            Kada sam bio u Nišu, sa porodicom smo posetili Piccolo i oduševili se. Moja deca su bila presrećna jer je igraonica zaista prilagođena njihovim godinama, a ja sam uživao u miru i odličnoj ponudi kafića. Toplo preporučujem svima koji su u Nišu sa decom.
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_4} alt="" loading="lazy"/>
                            <div>
                                <h3>Marko Petrović</h3>
                            </div>
                        </div>
                        <p>
                            Kao roditelj iz Niša, Piccolo igraonica je pravo mesto za moju decu da se bezbedno i kreativno igraju dok ja uživam u odličnoj kafi. Prostor je prostran i čist, a osoblje izuzetno pažljivo. Zaista mi prija što mogu da se opustim dok su mali zauzeti i srećni.
                        </p>
                    </div>
                </li>
            </ul>
        </div>

        {/* BUTTON - nestaje posle slanja */}
        {!sent && (
          <button
            className="btn dark-btn"
            onClick={() => setOpenForm(!openForm)}
          >
            Podeli svoje utiske
          </button>
        )}

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