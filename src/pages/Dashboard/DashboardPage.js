import React, { useState } from 'react'
import './DashboardPage.css'
import Toolbar from '../../components/Toolbar/Toolbar';
import Dashboard from '../../components/Dashboard/Dashboard';

const DashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [navStatus, setNavStatus] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

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
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <Dashboard 
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          editMode={editMode}
          setEditMode={setEditMode}
          activeIndex={activeIndex} 
          setNavStatus={setNavStatus}
        />
      </div>
    </main>
  )
}

export default DashboardPage