import React from 'react'
import './Hero.css'
import HeroBackground from './HeroBackground'

const Hero = () => {
  return (
    <>
        <HeroBackground />
        <section className='hero-banner'>
            <headline className='hero-text'>Reward yourself<br></br>for completing your goals.</headline>
            <p className='hero-description'>Set a goal.<br></br>Pick your reward.<br></br>Complete the tasks and EARN IT.</p>
            {/* <h3 className='hero-description'>Create your very own personalized goal calendar! Pick something you'd like to reward yourself with. Set a number of marbles you'll need to collect in order to earn the reward, making it as easy or challenging as you'd like. Then assign yourself tasks to complete each day, each with their own marble value.</h3> */}
            {/* <h3 className='hero-description'>Complete the tasks, collect your marbles, earn your reward!</h3> */}
            <button>Start today!</button>
        </section>
    </>
  )
}

export default Hero