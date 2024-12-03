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
	validateDates
}) => {
	const { startDate, endDate } = selectedCalendar;
	const weekEndDay = useMemo(
		() => dayjs(newEnd).endOf('week').startOf('day'),
		[newEnd]
	); //returns the last day of the week of 'end date'w
	const startMonth = dayjs(newStart).month();
	const endMonth = dayjs(newEnd).month();
	const startYear = dayjs(newStart).year();
	const endYear = dayjs(newEnd).year();

	const [activeCalendarIndex, setActiveCalendarIndex] = useState(0);
	const [calendarMonthsToRender, setCalendarMonthsToRender] = useState([]);
	const calendarMonths = useMemo(() => {
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
	}, [calendarMonths, selectedCalendar, toggleWeekends]);

	useEffect(() => {
		if (calendarMonths.length > 1) {
			const firstMonthStartDay = calendarMonths[0].start.startOf('week');
			const firstMonthEndDay = calendarMonths[0].end.startOf('week');
			const secondMonthStartDay = calendarMonths[1].start;
			const secondToLastMonthEndDay =
				calendarMonths[calendarMonths.length - 2].end;
			const lastMonthStartDay = weekEndDay.startOf('week');

			let updatedCalendarMonths = [...calendarMonths];

			if (
				firstMonthEndDay.isSame(secondMonthStartDay) &&
				dayjs(newStart).startOf('week').isSame(secondMonthStartDay) &&
				!lastMonthStartDay.startOf('week').isSame(firstMonthStartDay)
			) {
				updatedCalendarMonths = updatedCalendarMonths.slice(1);
			}

			const lastMonthNeeded = lastMonthStartDay.isBefore(
				secondToLastMonthEndDay
			); //checking if the last month's start day is before the second to last month's end day

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
	}, [calendarMonths, weekEndDay]);

	return calendarMonthsToRender.map((calendar, index) => {
		if (index !== activeCalendarIndex) return null;

		return (
			<div className='displayed-calendar' key={calendar + index}>
				<div className='calendar-table-container'>
					<div className='calendar-month-title'>
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
					<div
						className='calendar-table'
						style={{
							gridTemplateColumns: toggleWeekends || showWeekends
								? 'repeat(7, 1fr)'
								: 'repeat(5, 1fr)',
						}}
					>
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

							const isWeekendOutsideRange = showWeekends && !toggleWeekends && isWeekend;

							if (!toggleWeekends && isWeekend && !showWeekends) {
								return null;
							}

							const isOutsideRange =
								currentDay.isBefore(dayjs(newStart), 'day') ||
								currentDay.isAfter(dayjs(newEnd), 'day');

							const calendarIndex = selectedCalendar.tasks.findIndex((c) => c.date === currentDay.format('YYYY-MM-DD')); //used for onClick function on each day to locate day in state object and return tasks

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
											console.log(selectedCalendar.tasks[calendarIndex])
											if (isDirty) {
												validateDates()
											}
										}
									}} //the clicked-day's date and tasks
								>
									<div className='day-title'>
										<div>{currentDay.format('MMM')}</div>
										<div>{currentDay.format('ddd')}</div>
										<div>{currentDay.format('D')}</div>
									</div>
									<div className='day-divider'></div>
									{!isOutsideRange && (
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
