import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice'
import './InProgressCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

const InProgressCalendar = ({ activeIndex, setActiveIndex, setEditMode, hideShow, isOpen }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars)

    const [prevLength, setPrevLength] = useState(inProgressCalendars.length);

    useEffect(() => {
        if (inProgressCalendars.length || inProgressCalendars.length > prevLength) {
            setActiveIndex(inProgressCalendars.length -1);
        }
        setPrevLength(inProgressCalendars.length)
    }, [inProgressCalendars]);

    function setActive(index) {
        setActiveIndex(prevIndex => prevIndex === index ? null : index)
    }

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
                                setActive(index)
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