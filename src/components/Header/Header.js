import React from 'react'
import './Header.css'
import HeaderBackground from './HeaderBackground'

const Header = () => {
  return (
    <>
        <HeaderBackground />
        <header className='header'>
            <h1 className='hero-text'>Reward yourself<br></br>for completing your goals.</h1>
            <h3 className='hero-description'>Set your goal.<br></br>Pick your reward.<br></br>Complete your tasks.</h3>
            {/* <h3 className='hero-description'>Create your very own personalized goal calendar! Pick something you'd like to reward yourself with. Set a number of marbles you'll need to collect in order to earn the reward, making it as easy or challenging as you'd like. Then assign yourself tasks to complete each day, each with their own marble value.</h3> */}
            {/* <h3 className='hero-description'>Complete the tasks, collect your marbles, earn your reward!</h3> */}
            <button>Start today!</button>
        </header>
    </>
  )
}

export default Header