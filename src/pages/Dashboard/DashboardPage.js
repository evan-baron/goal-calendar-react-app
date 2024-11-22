import React, { useState } from 'react'
import './DashboardPage.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import Dashboard from '../../components/Dashboard/Dashboard';

const DashboardPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null);
  const [navStatus, setNavStatus] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  return (
    <main className='dashboard-main'>
      <div className='dashboard-page-container'>
        <Toolbar 
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          navStatus={navStatus}
          setNavStatus={setNavStatus}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedCalendar={selectedCalendar}
          setSelectedCalendar={setSelectedCalendar}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          setModalType={setModalType}
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