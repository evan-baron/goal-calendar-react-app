import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <section>
        <div className="logo-title">Marbler</div>
      </section>
      <section>
        <li>How it Works</li>
        <li>About</li>
        <li>Log In</li>
      </section>
    </nav>
  )
}

export default Navbar