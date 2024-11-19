import React, { useState } from 'react'
import './Navbar.css'
import Toolbar from '../Toolbar/Toolbar';

const Navbar = () => {
    const [navStatus, setNavStatus] = useState(true);

    function hideshow(toggleFunction) {
      toggleFunction(prevStatus => !prevStatus);
    }

    return (
        <div className={`nav-container ${navStatus ? 'nav-show' : 'nav-hide'}`}>
            <Toolbar />
            <div className='nav-hideshow'>
            <div className='nav-hideshow-btn' onClick={() => hideshow(setNavStatus)}>
                <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
            </div>
            </div>
        </div>
    )
}

export default Navbar