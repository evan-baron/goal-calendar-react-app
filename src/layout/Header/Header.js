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
                        <Link to="/about">About</Link> {/* make invisible after logged in */}
                    </li>
                    <li className="nav-link">
                        <Link to="/signup">Sign Up</Link> {/* make invisible after logged in */}
                    </li>
                    <li className="nav-link">
                        <Link to="/login">Log In</Link> {/* make invisible after logged in */}
                    </li>
                    <li className="nav-link">
                        <Link to="/">Log Out</Link> {/* make so only visible after logged in */}
                    </li>
                    <li className="nav-link">
                        <Link to="/account">My Account</Link> {/* make so only visible after logged in */}
                    </li>
                </ul>
            </section>
        </header>
    </>
  )
}

export default Header