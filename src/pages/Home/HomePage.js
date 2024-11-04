import React from 'react'
import './HomePage.css'
import Hero from './sections/Hero/Hero'
import PreviewDash from './sections/PreviewDash/PreviewDash'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import WhoItsFor from './sections/WhoItsFor/WhoItsFor'

const HomePage = () => {
  return (
    <main>
        <Hero />
        <PreviewDash /> {/* Looking at finnyai's page, maybe have a 'screenshot' of the calendar here? */}
        <HowItWorks /> {/* Looking at finnyai's page, maybe have the three sections broken down? each with own screenshot? Create, Complete, Reward? */}
        <WhoItsFor />
    </main>
  )
}

export default HomePage