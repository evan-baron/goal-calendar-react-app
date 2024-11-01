import React from 'react'
import './HomePage.css'
import Hero from '../../components/Hero/Hero'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import WhoItsFor from './sections/WhoItsFor/WhoItsFor'

const HomePage = () => {
  return (
    <main>
        <Hero />
        <HowItWorks />
        <WhoItsFor />
    </main>
  )
}

export default HomePage