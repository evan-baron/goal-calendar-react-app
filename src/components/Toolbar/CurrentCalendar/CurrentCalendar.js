import React from 'react'
import './CurrentCalendar.css'

const CurrentCalendar = ({ hideShow, isOpen, activeCalendar }) => {
  return (
    <div className='calendar-menu current-calendar-menu'>
        <div 
            className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideShow('current')}
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