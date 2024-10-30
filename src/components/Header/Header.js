import React from 'react'
import './Header.css'
import HeaderBackground from './HeaderBackground'

const Header = () => {
  return (
    <>
        <HeaderBackground />
        <header className='header'>
            <button>Sign up!</button>
        </header>
    </>
  )
}

export default Header