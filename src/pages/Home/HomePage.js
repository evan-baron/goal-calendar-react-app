import React from 'react'
import './HomePage.css'
import Hero from '../../components/Hero/Hero'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import WhoItsFor from './sections/WhoItsFor/WhoItsFor'

const HomePage = () => {
  return (
    <main>
        <Hero />
        <div className='sections'>
          <HowItWorks />
          <WhoItsFor />
        </div>
    </main>
  )
}

export default HomePage