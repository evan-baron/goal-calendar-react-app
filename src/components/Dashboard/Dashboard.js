import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectInProgressCalendars } from '../../features/NewCalendar/calendarSlice'
import './Dashboard.css'
import Calendar from '../../features/Calendar/Calendar'
import Controls from './Controls/Controls'

const Dashboard = ({ activeIndex }) => {
    const selectedCalendar = useSelector(selectInProgressCalendars); //array of in-progress calendars
    // console.log(activeIndex); //index of selected calendar in in-progress dropdown
    // console.log(selectedCalendar[activeIndex]); //calendar object of selected calendar in in-progress dropdown

    const { calendarName, startDate, endDate, length } = selectedCalendar[activeIndex] || {};

    useEffect(() => {
        console.log('Active Index or SelectedCalendar updated')
    }, [selectedCalendar, activeIndex])
    
    return (
        selectedCalendar.length > 0 && activeIndex >= 0 && selectedCalendar[activeIndex] ? (
        <>
            <div className='dashboard-container'>
                <Calendar
                    calendarName={calendarName}
                    startDate={startDate}
                    endDate={endDate}
                    length={length} 
                />
                <div className='dashboard-calendar-support'>
                    <div className='support-container dashboard-tasks'>Dashboard Tasks</div>
                    <div className='support-container dashboard-stats'>Dashboard Stats</div>
                </div>
            </div>
            <Controls />
        </>
        ) : null
    )
}

export default Dashboard