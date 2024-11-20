import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './DashboardPage.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import Modal from '../../components/Modal/Modal';
import { deleteCalendar } from '../../features/NewCalendar/calendarSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarToDelete, setCalendarToDelete] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  function handleDelete(calendarId) {
    setCalendarToDelete(calendarId);
    setIsModalOpen(true);
  }

  function confirmDelete() {
      if (calendarToDelete !== null) {
          dispatch(deleteCalendar(calendarToDelete));
          setCalendarToDelete(null);
      }
      setIsModalOpen(false);
      setActiveIndex(null);
  }

  function cancelDelete() {
      setIsModalOpen(false);
      setCalendarToDelete(null);
  }

  return (
    <main className='dashboard-main'>
      <div className='dashboard-container'>
        <Toolbar 
          onDelete={handleDelete}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <div className='dashboard'>Dashboard</div>
        <Modal
          isOpen={isModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this calendar?"
        />
      </div>
    </main>
  )
}

export default DashboardPage