import React from 'react'
import './NewCalendar.css'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice';
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';
import CalendarForm from '../../../features/CalendarForm/CalendarForm';

const NewCalendar = ({ isDirty, hideShow, isOpen, setEditMode, setIsModalOpen, setModalType }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars);

    return (
        <div className='calendar-menu'>
            <div 
                className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                onClick={() => {
                    if (isDirty) {
                        setModalType('save-changes')
                        setIsModalOpen(true)
                    } else if (inProgressCalendars.length >= 5) {
                        setModalType('too-many-calendars')
                        setIsModalOpen(true)
                    }  else {
                        hideShow('new')
                    }
                }}
            >
                New Calendar
            {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />}
            </div>
            <CalendarForm 
                setEditMode={setEditMode}
                hideShow={hideShow}
                isOpen={isOpen}
            />
        </div>
    )
}

export default NewCalendar