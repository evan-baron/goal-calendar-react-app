import React, { useState, useEffect } from 'react'
import './Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../CalendarForm/calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Controls from '../../components/Dashboard/Controls/Controls';
import { Edit, Check, DoNotDisturb } from '@mui/icons-material';
import Modal from '../../components/Modal/Modal';

const Calendar = ({ isDirty, setIsDirty, onDelete, activeIndex, editMode, setEditMode, setNavStatus, calendarName, startDate, endDate, length }) => {
  const [originalStart, setOriginalStart] = useState(startDate);
  const [newStart, setNewStart] = useState(dayjs(startDate));
  const [originalEnd, setOriginalEnd] = useState(endDate);
  const [newEnd, setNewEnd] = useState(dayjs(endDate));
  const [editName, setEditName] = useState(false);
  const [editStart, setEditStart] = useState(false);
  const [editEnd, setEditEnd] = useState(false);
  const [originalCalName, setOriginalCalName] = useState(calendarName);
  const [newCalName, setNewCalName] = useState(calendarName);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inProgressCalendars = useSelector(selectInProgressCalendars); //inProgressCalendars state array
  const calendarBeingEdited = inProgressCalendars[activeIndex]; //current inProgressCalendar selected
  const weekStartDay = dayjs(startDate).startOf('week'); //returns the first day of the week of 'start date'
  const weekEndDay = dayjs(endDate).endOf('week'); //returns the last day of the week of 'end date'
  const startMonth = weekStartDay.month();
  const endMonth = weekEndDay.month();
  const startYear = weekStartDay.year();
  const endYear = weekEndDay.year();
  let calendarMonths = []; //the months the calendar spans from start to finish
  const calendarRows = Math.ceil(weekEndDay.diff(weekStartDay, 'day')/7);
  const calendarsNeeded = Math.ceil(calendarRows / 6);
  
  //finds the active months during calendar start and end date and pushes to calendarMonths array
  for (let year = startYear; year <= endYear; year++) {
    const monthLimit = year === endYear ? endMonth : 11;
    for (let month = (year === startYear ? startMonth : 0); month <= monthLimit; month++) {
      calendarMonths.push(dayjs().month(month).year(year).format('MMMM'));
    }
  }

  // makes the current calendar name equal to the active calendar object's calendar name value, updates when page rerenders and dependency array checks if anything has happened to active index or inprog calendars
  useEffect(() => {
    setEditName(false)
    setNewCalName(calendarName)
  }, [activeIndex, inProgressCalendars, calendarName]);

  const toggleEdit = () => {
    setEditName(prev => !prev);
    setOriginalCalName(newCalName);
  };

  const changeStartDate = (newValue) => {
    setOriginalStart(newStart);
    console.log(originalStart);
    if (newStart !== dayjs(startDate)) {
      setNewStart(newValue)
      setEditStart(true)
      setIsDirty(true)
    } 
    console.log(dayjs(newStart));
  }

  const cancelChanges = () => {
    setNewCalName(originalCalName);
    setEditName(false);
    setIsModalOpen(false);
  }

  const acceptChanges = () => {
    setEditName(false);
    setIsModalOpen(false);
  }

  return (
    <div className='calendar-container'>
      <div className={editMode && !editName ? 'calendar-title edit-mode' : 'calendar-title'}>
        {editName 
          ? (
            <>
              <input
                className='edit-name-input'
                value={newCalName}
                onChange={(e) => {
                  setIsDirty(true);
                  setNewCalName(e.target.value);
                }}
              /> 
              <Check 
                className='check-icon' 
                onClick={() => {
                  if (newCalName !== originalCalName) {
                    setIsModalOpen(true)
                  }
                  setEditName(false);
                  setIsDirty(false);
                }}
                sx={{ fontSize: 50 }} 
              />
              <DoNotDisturb 
                className='cancel-icon'
                onClick={() => {
                  setEditName(false);
                  setIsDirty(false);
                  setNewCalName(originalCalName);
                }} 
                sx={{ fontSize: 40 }} 
              />
            </>
          )
          : <div className='calendar-name' onClick={editMode ? toggleEdit : null}>{newCalName}</div>
          // : <div className='calendar-name' onClick={editMode ? () => setEditName(prev => !prev) : null}>{newCalName}</div>
        }
        {editMode && !editName
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
                onClick={() => console.log('test')}
                onChange={changeStartDate}
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
            {editStart ? (
              <div className='date-confirm'>
                <Check 
                  className='date-check'
                  onClick={() => {

                  }}
                />
                <DoNotDisturb className='date-cancel'/>
              </div>
            ) : null}
          </div>
          <div className='calendar-select'>
            <div className='new-label'>End Date:</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker 
                value={newEnd}
                defaultValue={dayjs()}
                onChange={(newValue) => {
                  if (newEnd !== dayjs(endDate)) {
                    setNewEnd(newValue)
                    setEditEnd(true)
                    setIsDirty(true)
                  }
                }}
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
            {editEnd ? (
              <div className='date-confirm'>
                <Check className='date-check'/>
                <DoNotDisturb className='date-cancel'/>
              </div>
            ) : null}
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
      <Modal 
        isOpen={isModalOpen}
        onClose={cancelChanges}
        onConfirm={acceptChanges}
        message="Confirm Changes?"
      />
    </div>
  );
}

export default Calendar