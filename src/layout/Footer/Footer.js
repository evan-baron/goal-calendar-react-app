import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-nav">
        <section>
          <div className="footer-logo-title">
            <Link to="/">marbl'r</Link>
          </div>
        </section>
        <section>
          <ul className="footer-nav-section">
            <li className="footer-nav-link nav-title">Company</li>
            <li className="footer-nav-link">
              <Link to="/about">About</Link>
            </li>
            <li className="footer-nav-link">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </section>
        <section>
          <ul className="footer-nav-section">
            <li className="footer-nav-link nav-title">Help</li>
            <li className="footer-nav-link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="footer-nav-link">
              <Link to="/account">Account Info</Link> {/* only make visible if logged in */}
            </li>
          </ul>
        </section>
      </div>
      <div className="copyright">copyright text goes here</div>
    </div>
  )
}

export default Footer