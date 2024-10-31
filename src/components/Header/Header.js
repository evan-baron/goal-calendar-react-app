import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <>
        <header className='header'>
            <section>
                <div className="logo-title">Marbler</div>
            </section>
            <section>
                <ul className="header-nav">
                    <li className="nav-link">How it Works</li>
                    <li className="nav-link">About</li>
                    <li className="nav-link">Log In</li>
                </ul>
            </section>
        </header>
    </>
  )
}

export default Header