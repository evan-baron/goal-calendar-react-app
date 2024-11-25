import React, { useState } from 'react'
import './Toolbar.css'
import { useSelector } from 'react-redux';
import { selectActiveCalendars, selectInactiveCalendars } from '../../features/CalendarForm/calendarSlice';
import Divider from '../Divider/Divider'
import NewCalendar from './NewCalendar/NewCalendar';
import InProgressCalendar from './InProgressCalendar/InProgressCalendar';
import ActiveCalendar from './ActiveCalendar/ActiveCalendar';
import InactiveCalendar from './InactiveCalendar/InactiveCalendar';
import UpcomingCalendar from './UpcomingCalendar/UpcomingCalendar';
import CalendarForm from '../../features/CalendarForm/CalendarForm';
import { Add, Remove } from '@mui/icons-material';

const Toolbar = ({ inProgressCalendars, activeIndex, isDirty, navStatus, setActiveIndex, setEditMode, setIsModalOpen, setModalType, setNavStatus, setSelectedCalendar }) => {
    const activeCalendar = useSelector(selectActiveCalendars);
    const inactiveCalendars = useSelector(selectInactiveCalendars);

    const [newCalOpen, setNewCalOpen] = useState(false);
    const [inProgOpen, setInProgOpen] = useState(false);
    const [curCalOpen, setCurCalOpen] = useState(false);
    const [inactiveOpen, setInactiveOpen] = useState(false);
    const [upcomingOpen, setUpcomingOpen] = useState(false);
    const [calendars, setCalendars] = useState(false);

    function hideShow(section) {
        switch (section) {
            case 'new':
                setNewCalOpen((prev) => !prev);
                setInProgOpen(false);
                setCurCalOpen(false);
                setInactiveOpen(false);
                setUpcomingOpen(false);
                break;
            case 'inProgress':
                setInProgOpen((prev) => !prev);
                setNewCalOpen(false);
                setCurCalOpen(false);
                setInactiveOpen(false);
                setUpcomingOpen(false);
                break;
            case 'current':
                setCurCalOpen((prev) => !prev);
                setNewCalOpen(false);
                setInProgOpen(false);
                setInactiveOpen(false);
                setUpcomingOpen(false);
                break;
            case 'inactive':
                setInactiveOpen((prev) => !prev);
                setCurCalOpen(false);
                setInProgOpen(false);
                setNewCalOpen(false);
                setUpcomingOpen(false);
                break;
            case 'upcoming':
                setUpcomingOpen((prev) => !prev);
                setCurCalOpen(false);
                setInProgOpen(false);
                setNewCalOpen(false);
                setInactiveOpen(false)
                break;
            default:
                break;
        }
    }

    return (
        <div className={`nav-container ${navStatus ? 'nav-show' : 'nav-hide'}`}>
            <div className='toolbar'>
                <div className='toolbar-title'>
                    Dashboard
                    <Divider />
                </div>
                <div className='toolbar-section'>
                    <div 
                        className='toolbar-title'
                        onClick={() => {
                            if (isDirty) {
                                setModalType('save-changes')
                                setIsModalOpen(true)
                            } else {
                                setCalendars(prev => !prev)
                            }
                        }}
                    >
                        Calendars
                    </div>
                    {!calendars 
                        ? <Add fontSize='large' sx={{cursor: 'pointer'}} /> 
                        : <Remove fontSize='large' sx={{cursor: 'pointer'}} />}
                </div>
                {calendars ? (
                    <div className='toolbar-menu'>
                        {inProgressCalendars.length <= 4 ? <div 
                            className='new-calendar-button' 
                            onClick={() => {
                                if (isDirty) {
                                    setModalType('save-changes')
                                    setIsModalOpen(true)
                                } else if (inProgressCalendars.length >= 5) {
                                    setModalType('too-many-calendars')
                                    setIsModalOpen(true)
                                }  else {
                                    hideShow('new')
                                }
                            }}
                        >Start New Calendar</div> : null}
                        <ActiveCalendar 
                            hideShow={hideShow}
                            isOpen={curCalOpen}
                            activeCalendar={activeCalendar}
                            setSelectedCalendar={setSelectedCalendar}
                        />
                        {/* {activeCalendar.length > 0 ? (
                            <CurrentCalendar 
                                hideShow={hideShow}
                                isOpen={curCalOpen}
                                activeCalendar={activeCalendar}
                                setSelectedCalendar={setSelectedCalendar}
                                />
                                ) : null} */}
                        <UpcomingCalendar 
                            isDirty={isDirty}
                            isOpen={upcomingOpen}
                            hideShow={hideShow}
                        />
                        <InactiveCalendar 
                            hideShow={hideShow}
                            isOpen={inactiveOpen}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            setSelectedCalendar={setSelectedCalendar}
                        />
                        {/* {inactiveCalendars.length > 0 ? (
                            <InactiveCalendar 
                            hideShow={hideShow}
                            isOpen={inactiveOpen}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            setSelectedCalendar={setSelectedCalendar}
                            />
                            ) : null} */}
                        <InProgressCalendar 
                            inProgressCalendars={inProgressCalendars}
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
                        {/* {inProgressCalendars.length > 0 ? (
                            <InProgressCalendar 
                                inProgressCalendars={inProgressCalendars}
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
                        ) : null} */}
                    </div>
                ) : null}
                {/* <NewCalendar 
                    setEditMode={setEditMode}
                    hideShow={hideShow}
                    isOpen={newCalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setModalType={setModalType}
                    isDirty={isDirty}
                /> */}
            </div>
            <div className='nav-hideshow' onClick={() => setNavStatus(status => !status)}>
                <div className='nav-hideshow-btn'>
                    <div className={`nav-arrow ${navStatus ? 'nav-arrow-rotated' : ''}`}></div>
                </div>
            </div>
            {newCalOpen ? <CalendarForm 
                setEditMode={setEditMode}
                hideShow={hideShow}
                isOpen={newCalOpen}
            /> : null}
        </div>
    )
}

export default Toolbar