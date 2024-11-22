import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectInProgressCalendars } from '../../features/CalendarForm/calendarSlice'
import './Dashboard.css'
import CalendarDisplay from '../../features/CalendarDisplay/CalendarDisplay'

const Dashboard = ({ isDirty, setIsDirty, setIsModalOpen, isModalOpen, setModalType, modalType, activeIndex, editMode, setEditMode, setNavStatus }) => {
    const selectedInProgCalendar = useSelector(selectInProgressCalendars); //array of in-progress calendars

    const { calendarName, startDate, endDate, length } = selectedInProgCalendar[activeIndex] || {};

    useEffect(() => {
        //this re-renders the page if selectedCalendar or activeIndex change
    }, [selectedInProgCalendar, activeIndex])
    
    return (
        selectedInProgCalendar.length > 0 && activeIndex >= 0 && selectedInProgCalendar[activeIndex] ? (
            <div className='dashboard-container'>
                <CalendarDisplay
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                    activeIndex={activeIndex}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setNavStatus={setNavStatus}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    modalType={modalType}
                    setModalType={setModalType}
                    // SOON THE FOUR BELOW WILL BE DELETED
                    calendarName={calendarName}
                    startDate={startDate}
                    endDate={endDate}
                    length={length} 
                />
                {!editMode ? (<div className='dashboard-calendar-support'>
                    <div className='support-container dashboard-tasks'>Current Day Tasks</div>
                    <div className='support-container dashboard-stats'>Calendar Stats</div>
                </div>) : null}
            </div>
        ) : null
    )
}

export default Dashboard