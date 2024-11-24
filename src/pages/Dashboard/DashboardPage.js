import React, { useState, useEffect } from 'react'
import './DashboardPage.css'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars, selectCalendarById } from '../../features/CalendarForm/calendarSlice';
import Toolbar from '../../components/Toolbar/Toolbar';
import Dashboard from '../../components/Dashboard/Dashboard';

const DashboardPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [navStatus, setNavStatus] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

//////////////////////////////////

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

//////////////////////////////////

  const calendarId = selectedCalendar?.calendarId;
  const newCalendar = useSelector(selectCalendarById(calendarId))
  
  useEffect(() => {
    if (selectedCalendar && newCalendar) {
      setSelectedCalendar(newCalendar);
    }
  }, [prevLength, selectedCalendar, newCalendar])

  return (
    <main className='dashboard-main'>
      <div className='dashboard-page-container'>
        <Toolbar 
          activeIndex={activeIndex}
          isDirty={isDirty}
          navStatus={navStatus}
          setActiveIndex={setActiveIndex}
          setEditMode={setEditMode}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          setNavStatus={setNavStatus}
          setSelectedCalendar={setSelectedCalendar}
          inProgressCalendars={inProgressCalendars}
          prevLength={prevLength}
          setPrevLength={setPrevLength}
        />
        <Dashboard 
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedCalendar={selectedCalendar}
          setSelectedCalendar={setSelectedCalendar}
          activeIndex={activeIndex} 
          setNavStatus={setNavStatus}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          setModalType={setModalType}
        />
      </div>
    </main>
  )
}

export default DashboardPage