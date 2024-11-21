import React, { useState } from 'react'
import './Calendar.css'
import dayjs from 'dayjs';
import Controls from '../../components/Dashboard/Controls/Controls';

const Calendar = ({ onDelete, activeIndex, calendarName, startDate, endDate, length }) => {
  const weekStartDay = dayjs(startDate).startOf('week'); //returns the first day of the week of start date
  const weekEndDay = dayjs(endDate).endOf('week'); //returns the last day of the week of end date
  const startMonth = weekStartDay.month();
  const endMonth = weekEndDay.month();
  const startYear = weekStartDay.year();
  const endYear = weekEndDay.year();
  let calendarMonths = [];
  for (let year = startYear; year <= endYear; year++) {
    const monthLimit = year === endYear ? endMonth : 11;
    for (let month = (year === startYear ? startMonth : 0); month <= monthLimit; month++) {
      calendarMonths.push(dayjs().month(month).year(year).format('MMMM'));
    }
  }

  const calendarRows = Math.ceil(weekEndDay.diff(weekStartDay, 'day')/7);
  const calendarsNeeded = Math.ceil(calendarRows / 6);

  return (
    <div className='calendar-container'>
      <div className='calendar-name'>{calendarName}</div>
      <div className='calendar-table'>
        {[...Array(calendarRows * 7)].map((_, index) => {
          const currentDay = weekStartDay.add(index, 'day');
          const isOutsideRange = currentDay.isBefore(startDate, 'day') || currentDay.isAfter(endDate, 'day');
  
          return (
            <div
              className={`calendar-day ${isOutsideRange ? 'outside-range' : 'inside-range'}`}
              key={index}
            >
              <div className='day-title'>
                <div>{currentDay.format('dddd')}</div>
                <div>{currentDay.format('D')}</div>
              </div>
              {!isOutsideRange && (
                <>
                  <div className='day-divider'></div>
                  <div className='day-body'>
                    {/* Add any additional details for days inside the range here */}
                    <span>Details</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <Controls 
          activeIndex={activeIndex}
          onDelete={onDelete} 
      />
    </div>
  );
}

export default Calendar