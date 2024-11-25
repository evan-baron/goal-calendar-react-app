import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import './Calendar.css'
import { Edit, West, East } from '@mui/icons-material';

const Calendar = ({ editMode, selectedCalendar }) => {

    const [activeCalendarIndex, setActiveCalendarIndex] = useState(0);

    useEffect(() => {
        setActiveCalendarIndex(0)
    }, [selectedCalendar])

    const { startDate, endDate } = selectedCalendar;
    const weekStartDay = dayjs(startDate).startOf('week'); //returns the first day of the week of 'start date'
    const calendarStartDay = dayjs(startDate).startOf('month').startOf('week');
    const weekEndDay = dayjs(endDate).endOf('week'); //returns the last day of the week of 'end date'
    const calendarEndDay = dayjs(endDate).endOf('month').endOf('week');
        
    const totalDays = calendarEndDay.diff(calendarStartDay, 'day') + 1;
    const calendarRows = Math.ceil(totalDays)/7;
    
    const startMonth = dayjs(startDate).month();
    const endMonth = dayjs(endDate).month();
    const startYear = dayjs(startDate).year();
    const endYear = dayjs(endDate).year();

    let calendarMonths = []; //the months the calendar spans from start to finish
    
    //finds the active months during calendar start and end date and pushes to calendarMonths array
    for (let year = startYear; year <= endYear; year++) {
        const monthLimit = year === endYear ? endMonth : 11;
        for (let month = (year === startYear ? startMonth : 0); month <= monthLimit; month++) {
            const currentMonth = dayjs().month(month).year(year);
            calendarMonths.push({
                month: currentMonth.format('MMMM YYYY'),
                start: currentMonth.startOf('month').startOf('week'),
                end: currentMonth.endOf('month').endOf('week')
            });
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // NEED TO CHECK IF FIRST MONTH NEEDS TO BE RENDERED OR IF CALENDAR SHOULD START FROM SECOND MONTH

    let calendarMonthsToRender = [];
    const secondToLastMonthEndDay = calendarMonths[calendarMonths.length-2].end;
    const lastMonthStartDay = weekEndDay.startOf('week');
    
    const lastMonthNeeded = (lastMonthStartDay.isBefore(secondToLastMonthEndDay));

    if (lastMonthNeeded) {
        calendarMonthsToRender = calendarMonths.slice(0, calendarMonths.length - 1)
    } else {
        calendarMonthsToRender = calendarMonths
    }

    const calendarMonthIndexes = calendarMonthsToRender.map((month) => dayjs(month.month, 'MMMM YYYY').month());
    console.log(calendarMonthIndexes);

    /////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        calendarMonthsToRender.map((calendar, index) => {

            if (index !== activeCalendarIndex) return null;

            return (
                <div className='displayed-calendar'>
                    <div className='calendar-table-container'>
                        <div className='calendar-month-title'>
                            {index > 0 ? <West 
                                    className='left-arrow'
                                    onClick={() => {
                                        if (index > 0) {
                                            setActiveCalendarIndex(prev => prev - 1)
                                        }
                                    }}
                                    sx={{
                                        fontSize: 40,
                                        color: 'rgb(25, 25, 75)',
                                    }} 
                                /> : null}
                            <div className='calendar-month' key={index}>{calendar.month}</div>
                            {index < calendarMonthsToRender.length - 1 ? <East 
                                className='right-arrow' 
                                onClick={() => {
                                    if (index < calendarMonthsToRender.length -1) {
                                        setActiveCalendarIndex(prev => prev + 1)
                                    }
                                }}
                                sx={{
                                    fontSize: 40,
                                    color: 'rgb(25, 25, 75)',
                                }} 
                            /> : null}
                        </div>
                        <div className='calendar-table'>
                            {[...Array(calendar.end.diff(calendar.start, 'day') + 1)].map((_, dayIndex) => {
                                const currentDay = calendar.start.add(dayIndex, 'day');
                                // const calendarMonthIndex = dayjs(calendar.month, 'MMMM, YYYY').month();

                                const isOutsideRange =
                                    // currentDay.month() !== calendarMonthIndex ||
                                    currentDay.isBefore(dayjs(startDate), 'day') ||
                                    currentDay.isAfter(dayjs(endDate), 'day');

                                return (
                                    <div
                                        className={`calendar-day ${
                                            isOutsideRange
                                                ? 'outside-range'
                                                : editMode
                                                ? 'inside-range edit-mode'
                                                : 'inside-range'
                                        }`}
                                        key={dayIndex}
                                    >
                                        <div className="day-title">
                                            <div>{currentDay.format('MMM')}</div>
                                            <div>{currentDay.format('ddd')}</div>
                                            <div>{currentDay.format('D')}</div>
                                        </div>
                                        <div className="day-divider"></div>
                                        {!isOutsideRange && (
                                            <>
                                                <div className="day-body">
                                                    <span>Details</span>
                                                </div>
                                                {editMode ? (
                                                    <Edit sx={{ fontSize: 30 }} className="edit-pencil" />
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                )
                            })

                            }
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Calendar