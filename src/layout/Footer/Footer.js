import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-nav">
        <section>
          <div className="footer-logo-title">marbl'r</div>
        </section>
        <section>
          <ul className="footer-nav-section">
            <li className="footer-nav-link nav-title">Company</li>
            <li className="footer-nav-link">About</li>
            <li className="footer-nav-link">Privacy Policy</li>
          </ul>
        </section>
        <section>
          <ul className="footer-nav-section">
            <li className="footer-nav-link nav-title">Help</li>
            <li className="footer-nav-link">Contact</li>
            <li className="footer-nav-link">User Info</li>
          </ul>
        </section>
      </div>
      <div className="copyright">copyright text goes here</div>
    </div>
  )
}

export default Footer