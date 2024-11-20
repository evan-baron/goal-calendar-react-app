import React from 'react'
import './CurrentCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown, Add, Remove } from '@mui/icons-material';

const CurrentCalendar = ({ hideShow, isOpen, activeCalendar }) => {
  return (
    <div className='calendar-menu current-calendar-menu'>
        <div 
            className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideShow('current')}
        >
            Current Calendar
            {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />}
        </div>
        {isOpen ? (
            <div>Placeholder</div>
        ) : ''}
    </div>
  )
}

export default CurrentCalendar