import React, { useState, useEffect } from 'react'
import './CalendarDisplay.css'
import { useDispatch } from 'react-redux';
import { updateCalendar, deleteCalendar } from '../CalendarForm/calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Controls from '../../components/Dashboard/Controls/Controls';
import { Edit, Check, DoNotDisturb } from '@mui/icons-material';
import Modal from '../../components/Modal/Modal';
import Calendar from '../../components/Calendar/Calendar';

const CalendarDisplay = ({ isDirty, setIsDirty, isModalOpen, setIsModalOpen, modalType, setModalType, editMode, setEditMode, setNavStatus, selectedCalendar  }) => {

  const { calendarId, calendarName, startDate, endDate } = selectedCalendar;
  
  //States
  const [originalStart, setOriginalStart] = useState(dayjs(startDate));
  const [newStart, setNewStart] = useState(dayjs(startDate));
  const [originalEnd, setOriginalEnd] = useState(dayjs(endDate));
  const [newEnd, setNewEnd] = useState(dayjs(endDate));
  const [editName, setEditName] = useState(false);
  const [editStart, setEditStart] = useState(false);
  const [editEnd, setEditEnd] = useState(false);
  const [originalCalName, setOriginalCalName] = useState(calendarName);
  const [newCalName, setNewCalName] = useState(calendarName);

  //Variables & Functions
  const dispatch = useDispatch();
  const activeCalendar = calendarId; //current inProgressCalendar selected
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
    setEditName(false);
    setNewCalName(selectedCalendar?.calendarName);
    setOriginalStart(dayjs(selectedCalendar?.startDate));
    setOriginalEnd(dayjs(selectedCalendar?.endDate));
  }, [selectedCalendar]);


  const toggleEdit = () => {
    setEditName(prev => !prev);
    setOriginalCalName(newCalName);
  };

  const changeStartDate = (newValue) => {
    if (!newValue.isSame(newStart)) {
      setNewStart(newValue)
      setEditStart(true)
      setIsDirty(true)
    }
  }

  const changeEndDate = (newValue) => {
    if (!newValue.isSame(newEnd)) {
      setNewEnd(newValue)
      setEditEnd(true)
      setIsDirty(true)
    } 
  }
  
  const validateDates = () => {
    const start = newStart
    const end = newEnd
    const durationInDays = end.diff(start, 'day');

    if (end.isBefore(start) || end.isSame(start)) {
      setModalType('date-error-end-before')
      setIsModalOpen(true);
    } else

    if (durationInDays < 14) {
      setModalType('too-short')
      setIsModalOpen(true);
    } else

    if (durationInDays > 84) {
      setModalType('too-long')
      setIsModalOpen(true);
    } else

    if (start.isBefore(dayjs(), 'day')) {
      setModalType('in-the-past')
      setIsModalOpen(true);
    } else

    setModalType('save-changes')
    setIsModalOpen(true);
    return;
  }

  const saveChanges = () => {
    const start = newStart
    const end = newEnd

    const editedCalendar = {
      calendarId: activeCalendar,
      calendarName: newCalName,
      startDate: start.toISOString(),
      endDate: end.toISOString()
    }

    dispatch(updateCalendar(editedCalendar));

    setIsModalOpen(false);
    setIsDirty(false);
    setModalType(null);
  }
  
  const acceptChanges = () => {
    switch (modalType) {
      case 'discard-changes':
        setNewCalName(calendarName);
        setNewStart(dayjs(startDate));
        setNewEnd(dayjs(endDate));
        setIsDirty(false);
        setIsModalOpen(false);
        setModalType(null);
        break;
      case 'delete-calendar':
        dispatch(deleteCalendar(activeCalendar));
        setIsModalOpen(false);
        setModalType(null);
        break;
      case 'change-name':
        setIsModalOpen(false);
        setModalType(null);
        setEditName(false);
        break;
      case 'change-start':
        //missing logic here maybe??
        setEditStart(false);
        setIsModalOpen(false);
        setModalType(null);
        break;
      case 'change-end':
        //and here?
        setEditEnd(false);
        setIsModalOpen(false);
        setModalType(null);
        break;
      case 'save-changes':
        saveChanges()
        break;
      case 'change-calendars':
        saveChanges()
        break;
      default: 
        console.log('Unhandled modalType:', modalType);
        break;
    }
  }

  const rejectChanges = () => {
    switch (modalType) {
      case 'delete-calendar':
      case 'change-calendars':
      case 'discard-changes':
      case 'date-error-end-before':
      case 'too-short':
      case 'too-long':
      case 'in-the-past':
      case 'save-changes':
        setIsModalOpen(false);
        setModalType(null);
        break;

      case 'change-name':
        setNewCalName(originalCalName);
        setIsModalOpen(false);
        setEditName(false);
        break;
      case 'change-start':
        setNewStart(originalStart);
        setEditStart(false);
        setIsModalOpen(false);
        setModalType(null);
        break;
      case 'change-end':
        setNewEnd(originalEnd);
        setEditEnd(false);
        setIsModalOpen(false);
        setModalType(null);
        break;
      default:
        break;
    }
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newCalName !== originalCalName) {
                      setIsModalOpen(true)
                      setModalType('change-name')
                    }
                  }
                }}
              /> 
              <Check 
                className='check-icon' 
                onClick={() => {
                  if (newCalName !== originalCalName) {
                    setIsModalOpen(true)
                    setModalType('change-name')
                  }
                }}
                sx={{ fontSize: 50 }} 
              />
              <DoNotDisturb 
                className='cancel-icon'
                onClick={() => {
                  setEditName(false);
                  setNewCalName(originalCalName);
                }} 
                sx={{ fontSize: 40 }} 
              />
            </>
          )
          : <div className='calendar-name' onClick={editMode ? toggleEdit : null}>{newCalName}</div>
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
                value={dayjs(startDate)}
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
            {/* {editStart ? (
              <div className='date-confirm'>
                <Check 
                  className='date-check'
                  onClick={() => {
                    setIsModalOpen(true)
                    setModalType('change-start')
                  }}
                />
                <DoNotDisturb 
                  className='date-cancel'
                  onClick={() => {
                    setNewStart(originalStart);
                    setEditStart(false);
                  }}
                />
              </div>
            ) : null} */}
          </div>
          <div className='calendar-select'>
            <div className='new-label'>End Date:</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker 
                value={dayjs(endDate)}
                onChange={changeEndDate}
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
            {/* {editEnd ? (
              <div className='date-confirm'>
                <Check 
                  className='date-check'
                  onClick={() => {
                    setIsModalOpen(true)
                    setModalType('change-end')
                  }}
                />
                <DoNotDisturb 
                  className='date-cancel'
                  onClick={() => {
                    setEditEnd(false)
                    setNewEnd(originalEnd)
                  }}
                />
              </div>
            ) : null} */}
          </div>
      </div>) : null}
      {/* <div className='calendar-table'>
        {[...Array(calendarRows * 7)].map((_, index) => {
          const currentDay = weekStartDay.add(index, 'day');
          const isOutsideRange = currentDay.isBefore(dayjs(startDate), 'day') || currentDay.isAfter(dayjs(endDate), 'day');
  
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
                    <span>Details</span>
                  </div>
                  {editMode ? (<Edit sx={{ fontSize: 30 }} className='edit-pencil'/>) : null}
                </>
              )}
            </div>
          );
        })}
      </div> */}
      <Calendar 
        selectedCalendar={selectedCalendar}
        editMode={editMode}
      />
      <Controls 
        isDirty={isDirty}
        setNewCalName={setNewCalName}
        newCalName={newCalName}
        setEditName={setEditName}
        setEditMode={setEditMode}
        setNavStatus={setNavStatus}
        setIsModalOpen={setIsModalOpen}
        setModalType={setModalType}
        selectedCalendar={selectedCalendar}
        validateDates={validateDates}
      />
      <Modal 
        isOpen={isModalOpen}
        onClose={rejectChanges}
        onConfirm={acceptChanges}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
}

export default CalendarDisplay