import React from 'react';
import './InactiveCalendar.css';

const InactiveCalendar = ({ isDirty, isOpen, hideShow }) => {
	return (
		<div className='calendar-menu current-calendar-menu'>
			<div className='toolbar-section-title'>
				{/* <div 
            className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideShow('inactive')}
        > */}
				Previous Calendars
				{/* {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />} */}
			</div>
			<div className='previous-calendars'>
				<div className='previous-calendar-title'>Placeholder</div>
			</div>
			{/* {isOpen ? (
            <div>Placeholder</div>
        ) : ''} */}
		</div>
	);
};

export default InactiveCalendar;
