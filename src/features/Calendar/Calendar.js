import React from 'react'
import './Calendar.css'
import dayjs from 'dayjs';

const Calendar = ({ calendarName, startDate, endDate, length }) => {
  // console.log(Math.ceil(length/7));
  console.log('start day:', dayjs(startDate).format('ddd'), 'end day:', dayjs(endDate).format('ddd'));
  console.log('start of week of start day', dayjs(startDate).startOf('week').format('ddd'), 'end of week of end day', dayjs(endDate).endOf('week').format('ddd'));

  return (
    <div className='calendar-container'>
        <div className='calendar-name'>{calendarName}</div>
        <div className='dashboard-calendar'>Calendar</div>
    </div>
)
}

export default Calendar