import React from 'react'
import './NewCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown, Add, Remove } from '@mui/icons-material';
import CalendarForm from '../../../features/CalendarForm/CalendarForm';

const NewCalendar = ({ hideShow, isOpen }) => {
    return (
        <div className='calendar-menu'>
            <div 
                className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                onClick={() => hideShow('new')}
            >
                New Calendar
            {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />}
            </div>
            <CalendarForm 
                hideShow={hideShow}
                isOpen={isOpen}
            />
        </div>
    )
}

export default NewCalendar