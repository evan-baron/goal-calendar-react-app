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
          {/* Looking at finnyai's page, maybe have a 'screenshot' of the calendar */}
          <HowItWorks /> {/* Looking at finnyai's page, maybe have the three sections broken down? each with own screenshot? Create, Complete, Reward? */}
          <WhoItsFor />
        </div>
    </main>
  )
}

export default HomePage