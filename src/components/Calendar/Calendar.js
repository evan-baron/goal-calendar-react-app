import React from 'react'
import { useSelector } from 'react-redux';
import { selectInProgressCalendars, selectActiveCalendars, selectInactiveCalendars } from '../../features/CalendarForm/calendarSlice';
import dayjs from 'dayjs';
import './Calendar.css'

const Calendar = ({ activeIndex, editMode }) => {
    // Variables needed:
    // - activeIndex PROP
    // const calendarRows = Math.ceil(weekEndDay.diff(weekStartDay, 'day')/7);
    // - start day 
    // - end day 
    // - weekStartDay
    // - weekEndDay
    // - currentDay (day that's being mapped through to produce calendar - used to determine if inside or outside range)
    // - isOutsideRange (as noted by currentDay.isBefore(start day) || currentDay.isAfter(end day)
    // - editMode PROP

    return (
            <div>
                
            </div>

            // <div className='calendar-table'>
            //     {[...Array(calendarRows * 7)].map((_, index) => {
            //     const currentDay = weekStartDay.add(index, 'day');
            //     const isOutsideRange = currentDay.isBefore(dayjs(startDate), 'day') || currentDay.isAfter(dayjs(endDate), 'day');
        
            //     return (
            //         <div
            //         className={`calendar-day ${isOutsideRange 
            //             ? 'outside-range' 
            //             : editMode 
            //             ? 'inside-range edit-mode' 
            //             : 'inside-range'}`}
            //         key={index}
            //         >
            //         <div className='day-title'>
            //             <div>{currentDay.format('dddd')}</div>
            //             <div>{currentDay.format('D')}</div>
            //         </div>
            //         {!isOutsideRange && (
            //             <>
            //             <div className='day-divider'></div>
            //             <div className='day-body'>
            //                 {/* Add any additional details for days inside the range here */}
            //                 <span>Details</span>
            //             </div>
            //             {editMode ? (<Edit sx={{ fontSize: 30 }} className='edit-pencil'/>) : null}
            //             </>
            //         )}
            //         </div>
            //     );
            //     })}
            // </div>
    )
}

export default Calendar