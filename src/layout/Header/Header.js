import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../features/Login/loginSlice'
import { useSelector } from 'react-redux'
import './Header.css'

const Header = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.login.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        console.log('logged out');
    }

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
                        {!isLoggedIn ? (
                                <>
                                    <li className="nav-link">
                                        <Link to="/about">About</Link> {/* make invisible after logged in */}
                                    </li>                      
                                    <li className="nav-link">
                                        <Link to="/signup">Sign Up</Link> {/* make invisible after logged in */}
                                    </li>                        
                                    <li className="nav-link">
                                        <Link to="/login">Log In</Link> {/* make invisible after logged in */}
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-link">
                                        <Link to="/dashboard">Dashboard</Link> {/* make so only visible after logged in */}
                                    </li> 
                                    <li className="nav-link">
                                        <Link to="/account">My Account</Link> {/* make so only visible after logged in */}
                                    </li> 
                                    <li className="nav-link">
                                        <Link to="/" onClick={handleLogout}>Log Out</Link> {/* make so only visible after logged in */}
                                    </li> 
                                </>
                            )
                        }
                    </ul>
                </section>
            </header>
        </>
    )
}

export default Header