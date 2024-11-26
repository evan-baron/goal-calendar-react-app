import React, { useState, useEffect, useMemo } from 'react'
import dayjs from 'dayjs';
import './Calendar.css'
import { Edit, West, East } from '@mui/icons-material';

const Calendar = ({ editMode, selectedCalendar }) => {
    const { startDate, endDate } = selectedCalendar;
    const weekEndDay = useMemo(() => dayjs(endDate).endOf('week').startOf('day'), [endDate]); //returns the last day of the week of 'end date'            
    const startMonth = dayjs(startDate).month();
    const endMonth = dayjs(endDate).month();
    const startYear = dayjs(startDate).year();
    const endYear = dayjs(endDate).year();

    const [activeCalendarIndex, setActiveCalendarIndex] = useState(0);
    const [calendarMonthsToRender, setCalendarMonthsToRender] = useState([]);
    const calendarMonths = useMemo(() => {
        const months = [];
            
        //below function finds the active months during calendar start and end date and pushes to calendarMonths array
        for (let year = startYear; year <= endYear; year++) {
            const monthLimit = year === endYear ? endMonth : 11;
            for (let month = (year === startYear ? startMonth : 0); month <= monthLimit; month++) {
                const currentMonth = dayjs().month(month).year(year);
                months.push({
                    month: currentMonth.format('MMMM YYYY'),
                    start: currentMonth.startOf('month').startOf('week'),
                    end: currentMonth.endOf('month').endOf('week')
                });
            }
        }
        return months;
    }, [startDate, endDate]); //the months the calendar spans from start to finish   

    useEffect(() => {
        setActiveCalendarIndex(0)
    }, [calendarMonths, selectedCalendar])

    useEffect(() => {
        if (calendarMonths.length > 1) {
            const firstMonthStartDay = calendarMonths[0].start.startOf('week');
            const firstMonthEndDay = calendarMonths[0].end.startOf('week');
            const secondMonthStartDay = calendarMonths[1].start;
            const secondToLastMonthEndDay = calendarMonths[calendarMonths.length-2].end;
            const lastMonthStartDay = weekEndDay.startOf('week');

            let updatedCalendarMonths = [...calendarMonths];
            
            if (firstMonthEndDay.isSame(secondMonthStartDay) && dayjs(startDate).startOf('week').isSame(secondMonthStartDay) && !lastMonthStartDay.startOf('week').isSame(firstMonthStartDay)) {
                updatedCalendarMonths = updatedCalendarMonths.slice(1)
            }

            const lastMonthNeeded = (lastMonthStartDay.isBefore(secondToLastMonthEndDay)); //checking if the last month's start day is before the second to last month's end day
    
            if (lastMonthNeeded) {
                updatedCalendarMonths = updatedCalendarMonths.slice(0, updatedCalendarMonths.length - 1)
            } 
            
            setCalendarMonthsToRender(updatedCalendarMonths);

        } else {
            setCalendarMonthsToRender(calendarMonths);
        }
    }, [calendarMonths, weekEndDay])

    return (
        calendarMonthsToRender.map((calendar, index) => {

            if (index !== activeCalendarIndex) return null;

            return (
                <div className='displayed-calendar' key={calendar+index}>
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
                            <div className='calendar-month'>{calendar.month}</div>
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