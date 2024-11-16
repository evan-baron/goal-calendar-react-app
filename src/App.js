import React from 'react'
import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom'
import Header from './layout/Header/Header'
import HomePage from './pages/Home/HomePage'
import AboutPage from './pages/About/AboutPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import LoginPage from './pages/Login/LoginPage'
import ContactPage from './pages/Contact/ContactPage'
import AccountPage from './pages/AccountInfo/AccountPage'
import PrivacyPage from './pages/PrivacyPolicy/PrivacyPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import Footer from './layout/Footer/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="about" element={<AboutPage />}/>
        <Route path="signup" element={<SignUpPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="contact" element={<ContactPage />}/>
        <Route path="account" element={<AccountPage />}/>
        <Route path="privacy" element={<PrivacyPage />}/>
        <Route path="dashboard" element={<DashboardPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App