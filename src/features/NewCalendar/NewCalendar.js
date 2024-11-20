import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { selectInProgressCalendars, createCalendar } from './calendarSlice';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const NewCalendar = ({ hideshow, isOpen }) => {
    const dispatch = useDispatch();
    const inProgressCalendars = useSelector(selectInProgressCalendars);

    const [calendarName, setCalendarName] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(4, 'week')); //SET TO NULL WHEN READY TO LAUNCH


    function handleSubmit(e) {
        e.preventDefault();

        const createdCalendar = {
            calendarId: uuidv4(),
            calendarName: calendarName === '' ? `${dayjs().format('MMMM')} Calendar` : calendarName,
            startDate: startDate,
            endDate: endDate
        }

        if (startDate && endDate) {
            const start = dayjs(startDate);
            const end = dayjs(endDate);
    
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

        hideshow('new');
        setCalendarName('');
        //ADD LOGIC HERE TO RESET END DATE
        hideshow('inProgress');
    }

    return (
        <div className='new-calendar'>
            <div 
                className={isOpen ? 'toolbar-section-title menu-title selected' : 'toolbar-section-title menu-title'} 
                onClick={() => hideshow('new')}
            >
                New Calendar
            </div>
            {isOpen ? (
            <form 
                className='new-calendar-form'
                onSubmit={handleSubmit}
            >
                <div className='calendar-name'>
                    <div className='menu-title'>Calendar Name:</div>
                    <input 
                        type="text"
                        value={calendarName}
                        onChange={(e) => setCalendarName(e.target.value)}
                    />
                </div>
                <div className='calendar-dates'>
                    <div className='menu-title'>Select Dates:</div>
                    <div className='date-selector'>
                        <div className='start-date'>Start Date:</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                slotProps={{
                                    textField: {
                                    sx: {
                                        '& .MuiInputBase-root': {
                                        height: '1.5rem',
                                        width: '8rem',
                                        padding: '0',
                                        margin: '0'
                                        },
                                        '& .MuiInputBase-input': {
                                        color: 'rgb(25, 25, 75)',
                                        padding: '0'
                                        }
                                    }
                                    }
                                }}
                                value={startDate}
                                defaultValue={dayjs()}
                                onChange={(newValue) => setStartDate(newValue)}
                                required
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='date-selector'>
                        <div className='end-date'>End Date:</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                slotProps={{
                                    textField: {
                                    sx: {
                                        '& .MuiInputBase-root': {
                                        height: '1.5rem',
                                        width: '8rem',
                                        padding: '0',
                                        margin: '0'
                                        },
                                        '& .MuiInputBase-input': {
                                        color: 'rgb(25, 25, 75)',
                                        padding: '0'
                                        }
                                    }
                                    }
                                }}
                                value={endDate}
                                defaultValue={dayjs().add(4, 'week')}
                                onChange={(newValue) => setEndDate(newValue)}
                                required
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <button className='create-calendar' type='submit'>Create</button>
            </form>) : ''}
            {/* <div>Select Dates</div>
            <div>Edit Tasks</div>
            <div>Edit Reward</div> */}
        </div>
    )
}

export default NewCalendar