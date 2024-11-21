import React, { useState, useEffect } from 'react'
import './Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../CalendarForm/calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Controls from '../../components/Dashboard/Controls/Controls';
import { Edit } from '@mui/icons-material';

const Calendar = ({ onDelete, activeIndex, editMode, setEditMode, setNavStatus, calendarName, startDate, endDate, length }) => {
  const [newStart, setNewStart] = useState(dayjs(startDate));
  const [newEnd, setNewEnd] = useState(dayjs(endDate));
  const [editName, setEditName] = useState(false);
  const [newCalName, setNewCalName] = useState(calendarName);

  const inProgressCalendars = useSelector(selectInProgressCalendars);
  // console.log(inProgressCalendars);
  const calendarBeingEdited = inProgressCalendars[activeIndex];
  // console.log(calendarBeingEdited);
  // console.log(newStart, newEnd);

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

  // makes the current calendar name equal to the active calendar object's calendar name value, updates when page rerenders and dependency array checks if anything has happened to active index or inprog calendars
  useEffect(() => {
    setEditName(false)
    setNewCalName(calendarName)
  }, [activeIndex, inProgressCalendars]);

  return (
    <div className='calendar-container'>
      <div className={editMode ? 'calendar-title edit-mode' : 'calendar-title'}>
        {editName 
          ? <input
              className='edit-name-input'
              value={newCalName}
              onChange={(e) => setNewCalName(e.target.value)}/> 
          : <div className='calendar-name' onClick={editMode ? () => setEditName(prev => !prev) : null}>{newCalName}</div>
        }
        {editMode 
          ? <Edit className='title-pencil' sx={{ fontSize: 40 }}/> 
          : null
        }
      </div>
      {editMode ? (
        <div className='edit-dates'>
          <div className='calendar-select'>
            <div className='new-label'>Start Date:</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker 
                value={newStart}
                defaultValue={dayjs()}
                onChange={(newValue) => setNewStart(newValue)}
                required
                slotProps={{
                  textField: {
                  sx: {
                    '& .MuiInputBase-root': {
                      height: '1.75rem',
                      width: '8rem',
                      padding: '.25rem',
                      margin: '0',
                      background: 'white'
                    },
                    '& .MuiInputBase-input': {
                      color: 'rgb(25, 25, 75)',
                      padding: '0'
                    }
                  }
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div className='calendar-select'>
            <div className='new-label'>End Date:</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker 
                value={newEnd}
                defaultValue={dayjs()}
                onChange={(newValue) => setNewEnd(newValue)}
                required
                slotProps={{
                  textField: {
                  sx: {
                    '& .MuiInputBase-root': {
                      height: '1.75rem',
                      width: '8rem',
                      padding: '.25rem',
                      margin: '0',
                      background: 'white'
                    },
                    '& .MuiInputBase-input': {
                    color: 'rgb(25, 25, 75)',
                    padding: '0'
                    }
                  }
                  }
                }}
              />
            </LocalizationProvider>
          </div>
      </div>) : null}
      <div className='calendar-table'>
        {[...Array(calendarRows * 7)].map((_, index) => {
          const currentDay = weekStartDay.add(index, 'day');
          const isOutsideRange = currentDay.isBefore(startDate, 'day') || currentDay.isAfter(endDate, 'day');
  
          return (
            <div
              className={`calendar-day ${isOutsideRange 
                ? 'outside-range' 
                : editMode 
                  ? 'inside-range edit-mode' 
                  : 'inside-range'}`}
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
                  {editMode ? (<Edit sx={{ fontSize: 30 }} className='edit-pencil'/>) : null}
                </>
              )}
            </div>
          );
        })}
      </div>
      <Controls 
          setNewCalName={setNewCalName}
          newCalName={newCalName}
          setEditName={setEditName}
          editMode={editMode}
          setEditMode={setEditMode}
          setNavStatus={setNavStatus}
          activeIndex={activeIndex}
          onDelete={onDelete} 
      />
    </div>
  );
}

export default Calendar