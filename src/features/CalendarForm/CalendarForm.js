import React, { useState } from 'react'
import './CalendarForm.css'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars, createCalendar } from './calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const CalendarForm = ({ hideShow, isOpen, setEditMode }) => {
    const dispatch = useDispatch();
    const inProgressCalendars = useSelector(selectInProgressCalendars);

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

    function handleSubmit(e) {
        e.preventDefault();
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        const length = end.diff(start, 'day');

        const createdCalendar = {
            calendarId: uuidv4(),
            calendarName: calendarName === '' ? `${dayjs().format('MMMM')} Calendar` : calendarName,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            length: length
        }

        if (startDate && endDate) {
    
            // Check if endDate is before or equal to startDate
            if (end.isBefore(start) || end.isSame(start)) {
                alert('Your end date must be after your start date!');
                return;
            }
    
            // Check if the span is less than 14 days
            const dateDifference = end.diff(start, 'day'); // difference in days
            if (dateDifference < 14) {
                alert('The date span must be at least 14 days!');
                return;
            }
        }

        // SET THE BELOW BACK TO 1 IF ONLY ALLOWED TO CREATE ONE CALENDAR

        if (inProgressCalendars.length >= 5) {
            alert('You are already working on a calendar. You should finish it!');
            return;
        }

        dispatch(createCalendar(createdCalendar));

        setCalendarName('');
        setStartDate(dayjs());
        setEndDate(dayjs().add(4, 'week'));
        hideShow('new');
        setEditMode(true);
        hideShow('inProgress');
        // this is where the active new calendar logic needs to be
    }
    
    return (
        isOpen ? (
            <form 
                className='new-calendar-form'
                onSubmit={handleSubmit}
            >
                <div className='calendar-name'>
                    <div className='form-title'>Calendar Name:</div>
                    <input 
                        type="text"
                        value={calendarName}
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
        ) : null
    )
}

export default CalendarForm