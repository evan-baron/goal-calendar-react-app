import React from 'react'
import './Header.css'
import HeaderBackground from './HeaderBackground'

const Header = () => {
  return (
    <>
        <HeaderBackground />
        <header className='header'>
            <h1 className='hero-text'>Reward yourself<br></br>for completing your goals.</h1>
            <h3 className='hero-description'>Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum ipsum torquent posuere turpis proin mi id vehicula. Maximus hendrerit tristique metus aliquam velit vivamus. Tellus dapibus habitant quam habitant etiam pulvinar et mauris.</h3>
            <button>Sign up!</button>
        </header>
    </>
  )
}

export default Header