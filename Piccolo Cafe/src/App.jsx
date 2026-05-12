import React, { useState, Suspense } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import VideoPlayer from './Components/VideoPlayer/VideoPlayer'

const About = React.lazy(() => import('./Components/About/About'))
const Programs = React.lazy(() => import('./Components/Programs/Programs'))
const Campus = React.lazy(() => import('./Components/Campus/Campus'))
const Testimonials = React.lazy(() => import('./Components/Testimonials/Testimonials'))
const Contact = React.lazy(() => import('./Components/Contact/Contact'))
const Footer = React.lazy(() => import('./Components/Footer/Footer'))

const App = () => {
  const [activeGallery, setGallery] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)

  const setActiveGallery = (galleryName = null, index = 0) => {
    setGallery(galleryName)
    setImageIndex(index)
  }

  return (
    <main lang="sr">
      <Navbar />
      <Hero />

      <div className="container">

        {/* ABOUT */}
        <Suspense fallback={null}>
          <About />
        </Suspense>

        <Title subTitle="Un Piccolo Sorriso" title="Meni" />

        {/* PROGRAMS */}
        <Suspense fallback={null}>
          <Programs setActiveGallery={setActiveGallery} />
        </Suspense>

        <Title subTitle="Un Piccolo Sorriso" title="Galerija" />

        {/* CAMPUS */}
        <Suspense fallback={null}>
          <Campus />
        </Suspense>

        <Title subTitle="Un Piccolo Sorriso" title="Utisci posetioca" />

        {/* TESTIMONIALS */}
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>

        <Title subTitle="Un Piccolo Sorriso" title="Zakazivanje termina" />

        {/* CONTACT */}
        <Suspense fallback={null}>
          <Contact />
        </Suspense>

        {/* FOOTER */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

      </div>

      <VideoPlayer
        activeGallery={activeGallery}
        imageIndex={imageIndex}
        setActiveGallery={setActiveGallery}
      />
    </main>
  )
}

export default App