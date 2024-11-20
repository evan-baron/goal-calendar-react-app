import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/NewCalendar/calendarSlice'
import './InProgressCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown, Add, Remove } from '@mui/icons-material';

const InProgressCalendar = ({ activeIndex, setActiveIndex, onDelete, hideShow, isOpen }) => {
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
                        <div className='in-prog-calendar-title' onClick={() => toggleControls(index)}>{calendar.calendarName}
                        {activeIndex !== index
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />}
                        </div>
                        {activeIndex === index ? (
                        <div className='in-prog-controls'>
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