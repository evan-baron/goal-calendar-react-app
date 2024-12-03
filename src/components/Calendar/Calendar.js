import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import './Calendar.css';
import { Edit, West, East } from '@mui/icons-material';

const Calendar = ({
	editMode,
	isDirty,
	selectedCalendar,
	newStart,
	newEnd,
	toggleWeekends,
	showWeekends,
	validateDates,
	setSelectedDay,
	setTasksModalOpen
}) => {
	const { startDate, endDate } = selectedCalendar; //keeping this in here for now, but probably will delete as no longer using these variables, but good to have a fall-back solution
	const weekEndDay = useMemo(
		() => dayjs(newEnd).endOf('week').startOf('day'),
		[newEnd]
	); //returns the last day of the week of 'end date', memod so that it doesn't keep refreshing and rerendering
	const startMonth = dayjs(newStart).month();
	const endMonth = dayjs(newEnd).month();
	const startYear = dayjs(newStart).year();
	const endYear = dayjs(newEnd).year();

	const [activeCalendarIndex, setActiveCalendarIndex] = useState(0); //activeCalendarIndex is the calendar month being shown - when users navigate to the next / previous months, this changes
	const [calendarMonthsToRender, setCalendarMonthsToRender] = useState([]);

	const calendarMonths = useMemo(() => { //again using useMemo because only need to capture this once, while dayjs will keep rerendering
		const months = [];

		//below function finds the active months during calendar start and end date and pushes to calendarMonths array
		for (let year = startYear; year <= endYear; year++) {
			const monthLimit = year === endYear ? endMonth : 11;
			for (
				let month = year === startYear ? startMonth : 0;
				month <= monthLimit;
				month++
			) {
				const currentMonth = dayjs().month(month).year(year);
				months.push({
					month: currentMonth.format('MMMM YYYY'),
					start: currentMonth.startOf('month').startOf('week'),
					end: currentMonth.endOf('month').endOf('week'),
				});
			}
		}
		return months;
	}, [newStart, newEnd]); //the months the calendar spans from start to finish

	useEffect(() => {
		setActiveCalendarIndex(0);
	}, [calendarMonths, selectedCalendar, toggleWeekends]); //rerenders page anytime one of these three dependencies change

	useEffect(() => {
		if (calendarMonths.length > 1) {
			const firstMonthStartDay = calendarMonths[0].start.startOf('week');
			const firstMonthEndDay = calendarMonths[0].end.startOf('week');
			const secondMonthStartDay = calendarMonths[1].start;
			const secondToLastMonthEndDay =
				calendarMonths[calendarMonths.length - 2].end;
			const lastMonthStartDay = weekEndDay.startOf('week');

			let updatedCalendarMonths = [...calendarMonths];

			//below conditional checks specific edge case to make sure we're not rendering overlapping days if not necessary - for example, calendar starts dec 31 2024, you don't need to render all of december, just render january 2024 because technically the first week of january 2025 INCLUDES dec 31 2024
			if (
				firstMonthEndDay.isSame(secondMonthStartDay) &&
				dayjs(newStart).startOf('week').isSame(secondMonthStartDay) &&
				!lastMonthStartDay.startOf('week').isSame(firstMonthStartDay)
			) {
				updatedCalendarMonths = updatedCalendarMonths.slice(1);
			}

			//similar edge case to above, but checking if the last month's start day is before the second to last month's end day
			const lastMonthNeeded = lastMonthStartDay.isBefore(
				secondToLastMonthEndDay
			); 

			if (lastMonthNeeded) {
				updatedCalendarMonths = updatedCalendarMonths.slice(
					0,
					updatedCalendarMonths.length - 1
				);
			}

			setCalendarMonthsToRender(updatedCalendarMonths);
		} else {
			setCalendarMonthsToRender(calendarMonths);
		}
	}, [calendarMonths, weekEndDay]); //wrapped in useEffect because user can change these settings and page will need to rerender each time they do so

	//time to render the months:
	return calendarMonthsToRender.map((calendar, index) => {

		//below conditional prevents user from seeing nothing
		if (index !== activeCalendarIndex) return null;

		return (
			<div className='displayed-calendar' key={calendar + index}>
				<div className='calendar-table-container'>
					<div className='calendar-month-title'>
						{/* below checks if there's any months 'to the left', if so, renders clickable arrow */}
						{index > 0 ? (
							<West
								className='left-arrow'
								onClick={() => {
									if (index > 0) {
										setActiveCalendarIndex(
											(prev) => prev - 1
										);
									}
								}}
								sx={{
									fontSize: 40,
									color: 'rgb(25, 25, 75)',
								}}
							/>
						) : null}
						<div className='calendar-month'>{calendar.month}</div>
						{/* below checks if there's any months 'to the right', if so, renders clickable arrow */}
						{index < calendarMonthsToRender.length - 1 ? (
							<East
								className='right-arrow'
								onClick={() => {
									if (
										index <
										calendarMonthsToRender.length - 1
									) {
										setActiveCalendarIndex(
											(prev) => prev + 1
										);
									}
								}}
								sx={{
									fontSize: 40,
									color: 'rgb(25, 25, 75)',
								}}
							/>
						) : null}
					</div>
					{/* below div style is conditional to if user selected include weekeds or not */}
					<div
						className='calendar-table'
						style={{
							gridTemplateColumns: toggleWeekends || showWeekends
								? 'repeat(7, 1fr)'
								: 'repeat(5, 1fr)',
						}}
					>
						{/* below renders the calendar ('item' from .map method above) */}
						{[
							...Array(
								calendar.end.diff(calendar.start, 'day') + 1
							),
						].map((_, dayIndex) => {
							const currentDay = calendar.start.add(
								dayIndex,
								'day'
							);

							const isWeekend =
								currentDay.day() === 0 ||
								currentDay.day() === 6;

							//determines if weekends are considered inside or outside user's selected date range
							const isWeekendOutsideRange = showWeekends && !toggleWeekends && isWeekend;

							//'light switch' to turn on or off weekend display, provided user has selected to not include weekends in their date range
							if (!toggleWeekends && isWeekend && !showWeekends) {
								return null;
							}

							//determines if day is outside user's selected date range
							const isOutsideRange =
								currentDay.isBefore(dayjs(newStart), 'day') ||
								currentDay.isAfter(dayjs(newEnd), 'day');

							const calendarIndex = selectedCalendar.tasks.findIndex((c) => c.date === currentDay.format('YYYY-MM-DD')); //used for onClick function on each day to locate day in state object and return tasks

							//finally rendering the day items below with their key set to dayIndex
							return (
								<div
									className={`calendar-day ${
										isOutsideRange || isWeekendOutsideRange
											? 'outside-range'
											: editMode
											? 'inside-range edit-mode'
											: 'inside-range'
									}`}
									key={dayIndex}
									onClick={() => {
										if(!(isOutsideRange || isWeekendOutsideRange)) {
											//sets selected day to the clicked day, then opens tasks modal
											setSelectedDay(selectedCalendar.tasks[calendarIndex]);
											console.log(selectedCalendar.tasks[calendarIndex]);
											setTasksModalOpen(prev => prev = !prev);
											if (isDirty) {
												validateDates()
											}
										}
									}} //the clicked-day's date and tasks
								>
									{/* the day item's 'header', month day number */}
									<div className='day-title'>
										<div>{currentDay.format('MMM')}</div>
										<div>{currentDay.format('ddd')}</div>
										<div>{currentDay.format('D')}</div>
									</div>
									<div className='day-divider'></div>

									{/* below determines how to display the day using conditional styling */}
									{!isOutsideRange && !isWeekendOutsideRange && (
										<>
											<div className='day-body'>
												<span>Details</span>
											</div>
											{editMode && !isWeekendOutsideRange ? (
												<Edit
													sx={{ fontSize: 30 }}
													className='edit-pencil'
												/>
											) : null}
										</>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	});
};

export default Calendar;
