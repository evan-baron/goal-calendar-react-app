import React, { useState } from 'react'
import './CalendarForm.css'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars, createCalendar } from './calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Divider from '../../components/Divider/Divider';
import Modal from '../../components/Modal/Modal';

const CalendarForm = ({ hideShow, setEditMode }) => {
    const dispatch = useDispatch();
    const inProgressCalendars = useSelector(selectInProgressCalendars);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formModalType, setFormModalType] = useState(null);
    const [placeholderText, setPlaceholderText] = useState('Ex: Goal Calendar');
    const [calendarName, setCalendarName] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(4, 'week')); //SET TO NULL WHEN READY TO LAUNCH

    // Check if startDate is before today
    if (dayjs(startDate).isBefore(dayjs(), 'day')) {
        alert('You cannot create a calendar beginning before today!');
        setStartDate(dayjs());
        return;
    }

    const cancelCreate = () => {
        setCalendarName('');
        setStartDate(dayjs());
        setEndDate(dayjs().add(4, 'week'));
        hideShow('new');
    }

    const validateDates = (start, end) => {
        const durationInDays = end.diff(start, 'day');
    
        if (end.isBefore(start) || end.isSame(start)) {
            setFormModalType('date-error-end-before')
            setIsFormModalOpen(true);
            return true;
          } else
      
          if (durationInDays < 14) {
            setFormModalType('too-short')
            setIsFormModalOpen(true);
            return true;
          } else
      
          if (durationInDays > 84) {
            setFormModalType('too-long')
            setIsFormModalOpen(true);
            return true;
          } else
      
          if (start.isBefore(dayjs(), 'day')) {
            setFormModalType('in-the-past')
            setIsFormModalOpen(true);
            return true;
          } else

        return false;
    }
    

    const formModalConfirm = () => {
        switch (formModalType) {
            case 'date-error-end-before':
            case 'too-short':
            case 'too-long':
            case 'in-the-past':
                setFormModalType(null);
                setIsFormModalOpen(false);
                break;
            default:
                setFormModalType(null);
                setIsFormModalOpen(false);
                break;
        }
    }

    const formModalReject = () => {
        switch (formModalType) {
            case 'date-error-end-before':
            case 'too-short':
            case 'too-long':
            case 'in-the-past':
                setFormModalType(null);
                setIsFormModalOpen(false);
                break;
            default:
                setFormModalType(null);
                setIsFormModalOpen(false);
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        if (validateDates(start, end)) {
            return;
        } 
            
        const createdCalendar = {
            calendarId: uuidv4(),
            calendarName: calendarName === '' ? `${dayjs().format('MMMM')} Calendar` : calendarName,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
        }

        dispatch(createCalendar(createdCalendar));

        setCalendarName('');
        setStartDate(dayjs());
        setEndDate(dayjs().add(4, 'week'));
        hideShow('new');
        setEditMode(true);
        hideShow('inProgress');
        




        // SET THE BELOW BACK TO 1 IF ONLY ALLOWED TO CREATE ONE CALENDAR

        if (inProgressCalendars.length >= 5) {
            alert('You are already working on a calendar. You should finish it!');
            return;
        }

        // this is where the active new calendar logic needs to be
    }
    
    return (
        // isOpen ? (
        <div className='calendar-form-container'>
            <form 
                className='new-calendar-form'
                onSubmit={handleSubmit}
            >
                <div className='calendar-name'>
                    <div className='new-calendar-title'>Create New Calendar</div>
                    <Divider className='new-cal-divider' />
                    <div className='form-title'>Calendar Name:</div>
                    <input 
                        type="text"
                        value={calendarName}
                        placeholder={placeholderText}
                        onFocus={() => setPlaceholderText('')}
                        onBlur={() => setPlaceholderText('Ex: Goal Calendar')}
                        // placeholder={dayjs().format('MMMM')+' Calendar'}
                        onChange={(e) => setCalendarName(e.target.value)}
                    />
                </div>
                <div className='calendar-dates'>
                    <div className='form-title'>Select Dates:</div>
                    <div className='date-selector'>
                        <div className='start-date'>Start Date:</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker 
                                value={startDate}
                                defaultValue={dayjs()}
                                onChange={(newValue) => setStartDate(newValue)}
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
                    <div className='date-selector'>
                        <div className='end-date'>End Date:</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker 
                                value={endDate}
                                defaultValue={dayjs().add(4, 'week')}
                                onChange={(newValue) => setEndDate(newValue)}
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
                </div>
                <div className='new-cal-button-container'>
                    <button className='create-calendar' type='submit'>Create</button>
                    <button className='create-calendar' onClick={cancelCreate}>Cancel</button>
                </div>
            </form>
            <Modal 
                modalType={formModalType}
                isOpen={isFormModalOpen}
                onConfirm={formModalConfirm}
                onClose={formModalReject}
            />
        </div>
        // ) : null
    )
}

export default CalendarForm