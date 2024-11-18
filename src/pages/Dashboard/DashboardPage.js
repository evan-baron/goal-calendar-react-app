import React from 'react'
import './DashboardPage.css'
import Navbar from '../../components/Navbar/Navbar';

const DashboardPage = () => {
  return (
    <main className='dashboard-main'>
      <div className='dashboard-container'>
        <Navbar />
        <div className='dashboard'>Dashboard</div>
      </div>
    </main>
  )
}

export default DashboardPage