import React, { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [navStatus, setNavStatus] = useState(true);

    function hideshow() {
      setNavStatus(prevStatus => !prevStatus);
      console.log(navStatus);
      return;
    }

    return (
        <div className={`nav-container ${navStatus ? 'nav-show' : 'nav-hide'}`}>
            <nav className='dashboard-nav'>
                <div className='nav-title'>Toolbar</div>
                <ul>
                    <li>new calendar</li>
                    <li>edit calendar</li>
                    <li>view calendar</li>
                </ul>
            </nav>
            <div className='nav-hideshow'>
            <div className='nav-hideshow-btn' onClick={hideshow}>
                <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
            </div>
            </div>
        </div>
    )
}

export default Navbar