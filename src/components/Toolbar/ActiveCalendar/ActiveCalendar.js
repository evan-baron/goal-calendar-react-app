import React from 'react';
import './ActiveCalendar.css';
import {
	KeyboardArrowRight,
	KeyboardArrowDown,
	Add,
	Remove,
} from '@mui/icons-material';

const ActiveCalendar = ({ hideShow, isOpen, activeCalendar }) => {
	return (
		<div className='calendar-menu current-calendar-menu'>
			{/* <div 
            className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
            onClick={() => hideShow('current')}
        > */}
			<div
				className='toolbar-section-title'
				onClick={() => hideShow('current')}
			>
				Active Calendar
				{/* {!isOpen 
                        ? <KeyboardArrowRight fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <KeyboardArrowDown fontSize='large' sx={{cursor: 'pointer'}} />} */}
			</div>
			<div className='active-calendar'>
				<div className='active-calendar-title'>Placeholder</div>
			</div>
			{/* {isOpen ? (
            <div>Placeholder</div>
        ) : ''} */}
		</div>
	);
};

export default ActiveCalendar;
