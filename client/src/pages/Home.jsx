import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Jobs from '../components/Jobs'
import Download from '../components/Download'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Jobs/>
      <Download/>
      <Footer/>
    </div>
  )
}

export default Home
