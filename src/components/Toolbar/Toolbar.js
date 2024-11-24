import React, { useState } from 'react'
import './Toolbar.css'
import { useSelector } from 'react-redux';
import { selectActiveCalendars, selectInProgressCalendars, selectInactiveCalendars } from '../../features/CalendarForm/calendarSlice';
import Divider from '../Divider/Divider'
import NewCalendar from './NewCalendar/NewCalendar';
import InProgressCalendar from './InProgressCalendar/InProgressCalendar';
import CurrentCalendar from './CurrentCalendar/CurrentCalendar';
import InactiveCalendar from './InactiveCalendar/InactiveCalendar';
import { Add, Remove } from '@mui/icons-material';

const Toolbar = ({ activeIndex, isDirty, navStatus, setActiveIndex, setEditMode, setIsModalOpen, setModalType, setNavStatus, setSelectedCalendar }) => {
    const activeCalendar = useSelector(selectActiveCalendars);
    const inProgressCalendars = useSelector(selectInProgressCalendars);
    const inactiveCalendars = useSelector(selectInactiveCalendars);

    const [newCalOpen, setNewCalOpen] = useState(false);
    const [inProgOpen, setInProgOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);
    const [inactiveOpen, setInactiveOpen] = useState(false);
    const [calendars, setCalendars] = useState(false);

    function hideShow(section) {
        switch (section) {
            case 'new':
                setNewCalOpen((prev) => !prev);
                setInProgOpen(false);
                setCurCalOpen(false);
                setInactiveOpen(false);
                break;
            case 'inProgress':
                setInProgOpen((prev) => !prev);
                setNewCalOpen(false);
                setCurCalOpen(false);
                setInactiveOpen(false);
                break;
            case 'current':
                setCurCalOpen((prev) => !prev);
                setNewCalOpen(false);
                setInProgOpen(false);
                setInactiveOpen(false);
                break;
            case 'inactive':
                setInactiveOpen((prev) => !prev);
                setCurCalOpen(false);
                setInProgOpen(false);
                setNewCalOpen(false);
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
                                setSelectedCalendar={setSelectedCalendar}
                            />
                        ) : null}
                        <NewCalendar 
                            setEditMode={setEditMode}
                            hideShow={hideShow}
                            isOpen={newCalOpen}
                            setIsModalOpen={setIsModalOpen}
                            setModalType={setModalType}
                        />
                        {inProgressCalendars.length > 0 ? (
                            <InProgressCalendar 
                                hideShow={hideShow} 
                                isOpen={inProgOpen}
                                setEditMode={setEditMode}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                setSelectedCalendar={setSelectedCalendar}
                                isDirty={isDirty}
                                setIsModalOpen={setIsModalOpen}
                                setModalType={setModalType}
                            />
                        ) : null}
                        {inactiveCalendars.length > 0 ? (
                            <InactiveCalendar 
                                hideShow={hideShow}
                                isOpen={inactiveOpen}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                setSelectedCalendar={setSelectedCalendar}
                            />
                        ) : null}
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