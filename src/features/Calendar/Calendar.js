import React from 'react'
import './Calendar.css'

const Calendar = ({ calendarName, startDate, endDate, length }) => {
  return (
    <div className='calendar-container'>
        <div className='calendar-name'>{calendarName}</div>
        <div className='dashboard-calendar'>Calendar</div>
    </div>
  )
}

export default Calendar