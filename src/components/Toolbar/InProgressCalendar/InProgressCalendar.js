import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice'
import './InProgressCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

const InProgressCalendar = ({ isDirty, setIsDirty, setIsModalOpen, setModalType, setSelectedCalendar, activeIndex, setActiveIndex, setEditMode, hideShow, isOpen }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars)

    const [prevLength, setPrevLength] = useState(inProgressCalendars.length);

    useEffect(() => {
        if (inProgressCalendars.length || inProgressCalendars.length > prevLength) {
            setActiveIndex(inProgressCalendars.length -1);
        }
        setPrevLength(inProgressCalendars.length)
    }, [inProgressCalendars]);

    return (
        <div className={isOpen 
            ? 'calendar-menu selected'
            : 'calendar-menu'}>
            <div 
                className='toolbar-section-title menu-title' 
                onClick={() => hideShow('inProgress')}
            >
                In Progress
                {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />}
            </div>
            {isOpen ? (
                inProgressCalendars.map((calendar, index) => (
                    <div className={activeIndex === index ? 'in-prog-calendar active-calendar' : 'in-prog-calendar'} key={index}>
                        <div 
                            className='in-prog-calendar-title' 
                            onClick={() => {
                                if (isDirty) {
                                    setModalType('change-calendars')
                                    setIsModalOpen(true)
                                    return;
                                }
                                setActiveIndex(prevIndex => prevIndex === index ? null : index)     //THIS IS WHAT CHANGES ACTIVE INDEX, THIS IS NEEDED IN INACTIVECALENDAR.JS FILE AND ACTIVECALENDAR.JS FILE
                                setEditMode(true)
                                }}>
                            {calendar.calendarName}
                        </div>
                    </div>
                )) 
            ) : null}
        </div>
    )
}

export default InProgressCalendar