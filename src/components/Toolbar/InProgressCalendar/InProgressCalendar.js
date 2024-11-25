import React from 'react'
import './InProgressCalendar.css'

const InProgressCalendar = ({ inProgressCalendars, isDirty, setIsModalOpen, setModalType, setSelectedCalendar, activeIndex, setActiveIndex, setEditMode, hideShow, isOpen }) => {

    return (
        <div className='calendar-menu'>
        {/* <div className={isOpen 
            ? 'calendar-menu selected'
            : 'calendar-menu'}> */}
            <div 
                className='toolbar-section-title menu-title' 
                onClick={() => {
                    if (isDirty) {
                        setModalType('save-changes')
                        setIsModalOpen(true)
                    } else {
                    hideShow('inProgress')}
                }}
            >
                Works-in-Progress
                {/* {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />} */}
            </div>
            {inProgressCalendars.map((calendar, index) => {
                return (
                    <div
                        className={activeIndex === index ? 'in-prog-calendar selected-calendar' : 'in-prog-calendar'}
                        key={index}
                    >
                        <div 
                            className='in-prog-calendar-title' 
                            id={calendar.calendarId}
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
                );
            })}
            {/* {isOpen ? (
                inProgressCalendars.map((calendar, index) => (
                    <div className={activeIndex === index ? 'in-prog-calendar active-calendar' : 'in-prog-calendar'} key={index}>
                        <div 
                            className='in-prog-calendar-title' 
                            id={calendar.calendarId}
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
            ) : null} */}
        </div>
    )
}

export default InProgressCalendar