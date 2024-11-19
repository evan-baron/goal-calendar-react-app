import React from 'react'
import './DashboardPage.css'
import Toolbar from '../../components/Toolbar/Toolbar';

const DashboardPage = () => {
  return (
    <main className='dashboard-main'>
      <div className='dashboard-container'>
        <Toolbar />
        <div className='dashboard'>Dashboard</div>
      </div>
    </main>
  )
}

export default DashboardPage