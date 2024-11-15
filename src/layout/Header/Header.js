import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <>
        <header className='header'>
            <section className='header-section'>
                <div className="logo-title">
                    <Link to="/">marbl'r</Link>
                </div>
            </section>
            <section className='header-section'>
                <ul className="header-nav">
                    <li className="nav-link">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/login">Log In</Link>
                    </li>
                </ul>
            </section>
        </header>
    </>
  )
}

export default Header