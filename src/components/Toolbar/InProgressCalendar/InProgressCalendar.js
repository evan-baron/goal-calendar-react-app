import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/NewCalendar/calendarSlice'
import './InProgressCalendar.css'

const InProgressCalendar = ({ activeIndex, setActiveIndex, onDelete, hideshow, isOpen }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars)

    const [prevLength, setPrevLength] = useState(inProgressCalendars.length);

    useEffect(() => {
        if (inProgressCalendars.length > prevLength) {
            setActiveIndex(inProgressCalendars.length -1);
        }
        setPrevLength(inProgressCalendars.length)
    }, [inProgressCalendars]);

    function toggleControls(index) {
        setActiveIndex(prevIndex => prevIndex === index ? null : index)
    }

    return (
        <div className='current-calendar-menu'>
            <div 
                className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                onClick={() => hideshow('inProgress')}
            >
                In Progress
            </div>
            {isOpen ? (
                inProgressCalendars.map((calendar, index) => (
                    <div className='in-prog-calendar' key={index}>
                        <div className='in-prog-calendar-title' onClick={() => toggleControls(index)}>{calendar.calendarName}</div>
                        {activeIndex === index ? (
                        <div className='in-prog-cal-controls'>
                            <div>Edit</div>
                            <div onClick={() => onDelete(calendar.calendarId)}>Delete</div>
                        </div>
                        ) : null}
                    </div>
                )) 
            ) : null}
        </div>
    )
}

export default InProgressCalendar