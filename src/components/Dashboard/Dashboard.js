import React from 'react'
import { useSelector } from 'react-redux'
import { selectInProgressCalendars } from '../../features/NewCalendar/calendarSlice'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
        <div className='calendar-container'>
            <div className='calendar-name'>Calendar Name</div>
            <div className='dashboard-calendar'>Calendar</div>
        </div>
        <div className='dashboard-calendar-support'>
            <div className='support-container dashboard-tasks'>Dashboard Tasks</div>
            <div className='support-container dashboard-stats'>Dashboard Stats</div>
        </div>
    </div>
  )
}

export default Dashboard