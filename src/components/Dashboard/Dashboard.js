import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectInProgressCalendars } from '../../features/CalendarForm/calendarSlice'
import './Dashboard.css'
import Calendar from '../../features/Calendar/Calendar'
import Controls from './Controls/Controls'

const Dashboard = ({ onDelete, activeIndex, editMode, setEditMode }) => {
    const selectedCalendar = useSelector(selectInProgressCalendars); //array of in-progress calendars

    const { calendarName, startDate, endDate, length } = selectedCalendar[activeIndex] || {};

    useEffect(() => {
        //this re-renders the page if selectedCalendar or activeIndex change
    }, [selectedCalendar, activeIndex])
    
    return (
        selectedCalendar.length > 0 && activeIndex >= 0 && selectedCalendar[activeIndex] ? (
        <>
            <div className='dashboard-container'>
                <Calendar
                    onDelete={onDelete}
                    activeIndex={activeIndex}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    calendarName={calendarName}
                    startDate={startDate}
                    endDate={endDate}
                    length={length} 
                />
                <div className='dashboard-calendar-support'>
                    <div className='support-container dashboard-tasks'>Current Day Tasks</div>
                    <div className='support-container dashboard-stats'>Calendar Stats</div>
                </div>
            </div>
        </>
        ) : null
    )
}

export default Dashboard