import React, { useState } from 'react'
import './Toolbar.css'
import { useSelector } from 'react-redux';
import { selectActiveCalendars, selectInProgressCalendars, selectInactiveCalendars } from '../../features/CalendarForm/calendarSlice';
import Divider from '../Divider/Divider'
import NewCalendar from './NewCalendar/NewCalendar';
import InProgressCalendar from './InProgressCalendar/InProgressCalendar';
import CurrentCalendar from './CurrentCalendar/CurrentCalendar';
import { Add, Remove } from '@mui/icons-material';

const Toolbar = ({ activeIndex, setActiveIndex, onDelete, setEditMode, navStatus, setNavStatus }) => {
    const activeCalendar = useSelector(selectActiveCalendars);
    const inProgressCalendars = useSelector(selectInProgressCalendars);

    const [newCalOpen, setNewCalOpen] = useState(false);
    const [inProgOpen, setInProgOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);
    const [calendars, setCalendars] = useState(false);

    function hideShow(section) {
        switch (section) {
            case 'new':
                setNewCalOpen((prev) => !prev);
                setInProgOpen(false);
                setCurCalOpen(false);
                break;
            case 'inProgress':
                setInProgOpen((prev) => !prev);
                setNewCalOpen(false);
                setCurCalOpen(false);
                break;
            case 'current':
                setCurCalOpen((prev) => !prev);
                setNewCalOpen(false);
                setInProgOpen(false);
                break;
            default:
                break;
        }
    }

    return (
        <div className={`nav-container ${navStatus ? 'nav-show' : 'nav-hide'}`}>
            <div className='toolbar'>
                <div className='toolbar-title'>Dashboard</div>
                <Divider />
                {/* <div className={calendars ? 'toolbar-section selected' : 'toolbar-section'}> */} {/* add back if i want to keep section title selected */}
                <div className='toolbar-section'>
                    <div 
                        className='toolbar-title'
                        onClick={() => setCalendars(prev => !prev)}
                    >
                        Calendars
                    </div>
                    {!calendars 
                        ? <Add fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <Remove fontSize='large' sx={{cursor: 'pointer'}} />}
                </div>
                {calendars ? (
                    <div className='toolbar-menu'>
                        {activeCalendar.length > 0 ? (
                            <CurrentCalendar 
                                hideShow={hideShow}
                                isOpen={curCalOpen}
                                activeCalendar={activeCalendar}
                            />
                        ) : null}
                        <NewCalendar 
                            setEditMode={setEditMode}
                            hideShow={hideShow}
                            isOpen={newCalOpen}
                        />
                        {inProgressCalendars.length > 0 ? (
                            <InProgressCalendar 
                                hideShow={hideShow} 
                                isOpen={inProgOpen}
                                setEditMode={setEditMode}
                                onDelete={onDelete}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        ) : null}
                        {/* PREVIOUS CALENDARS (INACTIVE CALENDARS) WILL GO HERE */}
                    </div>
                ) : null}
            </div>
            <div className='nav-hideshow'>
            <div className='nav-hideshow-btn' onClick={() => setNavStatus(status => !status)}>
                <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
            </div>
            </div>
        </div>
    )
}

export default Toolbar