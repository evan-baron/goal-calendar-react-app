import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars, deleteCalendar } from '../../../features/NewCalendar/calendarSlice'
import './InProgressCalendar.css'

const InProgressCalendar = ({ hideshow, isOpen }) => {
    const dispatch = useDispatch();

    const inProgressCalendars = useSelector(selectInProgressCalendars)

    const [activeIndex, setActiveIndex] = useState(null);
    const [prevLength, setPrevLength] = useState(inProgressCalendars.length)

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
                            <div onClick={() => {
                                dispatch(deleteCalendar(calendar.calendarId));
                                setActiveIndex(null);
                            }}>Delete</div>
                        </div>
                        ) : null}
                    </div>
                )) 
            ) : null}
        </div>
    )
}

export default InProgressCalendar