import React, { useState, Suspense } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import VideoPlayer from './Components/VideoPlayer/VideoPlayer'

// Lazy load veće komponente
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
        <Suspense fallback={<div>Loading...</div>}>
          <About />
          <Title subTitle="Un Piccolo Sorriso" title="Meni" />
          <Programs setActiveGallery={setActiveGallery} />
          <Title subTitle="Un Piccolo Sorriso" title="Galerija" />
          <Campus />
          <Title subTitle="Un Piccolo Sorriso" title="Utisci posetioca" />
          <Testimonials />
          <Title subTitle="Un Piccolo Sorriso" title="Zakazivanje termina" />
          <Contact />
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
