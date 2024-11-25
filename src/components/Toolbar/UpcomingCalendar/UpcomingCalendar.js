import React from 'react'
import './UpcomingCalendar.css'

const UpcomingCalendar = ({ isDirty, isOpen, hideShow }) => {
    return (
        <div className='calendar-menu current-calendar-menu'>
            <div 
                className='toolbar-section-title'
            >
            {/* <div 
                className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                onClick={() => hideShow('upcoming')}
            > */}
                Upcoming Calendars
                {/* {!isOpen 
                            ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                            : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />} */}
            </div>
            <div className='upcoming-calendars'>
                <div className='upcoming-calendar-title'>Placeholder</div>
            </div>
            {/* {isOpen ? (
                <div>Placeholder</div>
            ) : ''} */}
        </div>
      )
}

export default UpcomingCalendar