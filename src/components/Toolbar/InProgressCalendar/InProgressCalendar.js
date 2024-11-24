import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../../features/CalendarForm/calendarSlice'
import './InProgressCalendar.css'
import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material';

const InProgressCalendar = ({ isDirty, setIsModalOpen, setModalType, setSelectedCalendar, activeIndex, setActiveIndex, setEditMode, hideShow, isOpen }) => {
    const inProgressCalendars = useSelector(selectInProgressCalendars)
    
    const [prevLength, setPrevLength] = useState(inProgressCalendars.length ? 0 : null);

    useEffect(() => {
        if (inProgressCalendars.length > prevLength) {
            const newIndex = inProgressCalendars.length -1;
            setActiveIndex(newIndex);
            setSelectedCalendar(inProgressCalendars[newIndex]);
        } else if (inProgressCalendars.length < prevLength) {
            if (activeIndex !== null || activeIndex >= inProgressCalendars.length) {
                setActiveIndex(null);
                setSelectedCalendar(null);
            }
        }
        setPrevLength(inProgressCalendars.length)
    }, [inProgressCalendars, prevLength, setActiveIndex, setSelectedCalendar]);

    return (
        <div className={isOpen 
            ? 'calendar-menu selected'
            : 'calendar-menu'}>
            <div 
                className='toolbar-section-title menu-title' 
                onClick={() => {
                    if (inProgressCalendars.length >= 5) {
                        setModalType('save-changes')
                        setIsModalOpen(true)
                    } else {
                    hideShow('inProgress')}
                }}
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

                                const newIndex = activeIndex === index ? null : index;

                                setActiveIndex(newIndex);

                                setSelectedCalendar(newIndex !== null ? inProgressCalendars[newIndex] : null)     
                                setEditMode(true)
                                }}
                        >
                            {calendar.calendarName}
                        </div>
                    </div>
                )) 
            ) : null}
        </div>
    )
}

export default InProgressCalendar