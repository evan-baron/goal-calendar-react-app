import React from 'react'
import './CurrentCalendar.css'

const CurrentCalendar = ({ hideshow, isOpen }) => {
  return (
    <div className='current-calendar-menu'>
        <div 
            className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideshow('current')}
        >
            Current Calendar
        </div>
        {isOpen ? (
            <div>Placeholder</div>
        ) : ''}
    </div>
  )
}

export default CurrentCalendar