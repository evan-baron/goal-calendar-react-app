import React, { useState } from 'react';
import './RecurrenceForm.css';
import dayjs from 'dayjs';

const RecurrenceForm = ({
	dailyTasks,
	setDailyTasks,
	selectedCalendar,
	selectedDay,
	setRecurrenceModalOpen,
	setIsModalOpen,
	setModalType,
}) => {
	const [selectedOption, setSelectedOption] = useState('daily');
	const [selectedStart, setSelectedStart] = useState(dayjs(selectedDay.date));
	const [selectedEnd, setSelectedEnd] = useState(
		dayjs(selectedCalendar.endDate)
	);

	const day = dayjs(selectedDay.date).format('dddd');

	let durationArr = selectedCalendar.days.map((task) => task.date);

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'option':
				setSelectedOption(value);
				break;
			case 'start':
				setSelectedStart(dayjs(value));
				break;
			case 'end':
				setSelectedEnd(dayjs(value));
				break;
			default:
				console.log('Unknown input name: ', name);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (dayjs(selectedEnd).isBefore(dayjs(selectedStart))) {
			setIsModalOpen('true');
			setModalType('task-end-before-start')
			return
		} else {
			console.log('selected option value: ', selectedOption);
			console.log('selected start: ', selectedStart.format('YYYY-MM-DD'));
			console.log('selected end: ', selectedEnd.format('YYYY-MM-DD'));

			const startingIndex = selectedCalendar.days.findIndex((date) => dayjs(date.date).format('YYYY-MM-DD') === dayjs(selectedStart).format('YYYY-MM-DD'));
			const endingIndex = selectedCalendar.days.findIndex((date) => dayjs(date.date).format('YYYY-MM-DD') === dayjs(selectedEnd).format('YYYY-MM-DD'));
			const startingIndexDayIndex = dayjs(startingIndex).day();

			switch (selectedOption) {
				case 'daily':
					console.log('daily');
					console.log(selectedCalendar);
					console.log('starting index: ', startingIndex);
					console.log('ending index: ', endingIndex);

					let dailyArr = [];

					for (let i = startingIndex; i <= endingIndex; i++) {
						dailyArr.push(selectedCalendar.days[i])
					}

					console.log('dailyArr: ', dailyArr);

					break;
				case 'alternate':
					console.log('alternate');
					console.log(selectedCalendar);
					console.log('starting index: ', startingIndex);
					console.log('ending index: ', endingIndex);
					console.log('starting index day index: ',startingIndexDayIndex)
					let alternateArr = [];

					for (let i = startingIndex; i <= endingIndex; i++) {
						const currentDay = dayjs(selectedCalendar.days[i].date).day();
						
						if (currentDay % 2 === startingIndexDayIndex % 2) {
							alternateArr.push(selectedCalendar.days[i].date)
						}
					}

					console.log('alternateArr: ', alternateArr);
					break;
				case 'weekly':
					console.log('weekly');
					break;
				case 'biweekly':
					console.log('biweekly');
					break;
				case 'custom':
					console.log('custom');
					break;
				default:
					break;
			}
		}
	};

	return (
		<form className='recurrence-form' onSubmit={handleSubmit}>
			<div className='recurrence-title'>Repeat Task</div>
			<div className='recurrence-options'>
				<label className='option'>
					<div>Frequency:</div>
					<select
						id='dropdown'
						name='option'
						value={selectedOption}
						onChange={handleChange}
					>
						<option value='daily'>Every day</option>
						<option value='alternate'>Every other day</option>
						<option value='weekly'>Every {day}</option>
						<option value='biweekly'>Every other {day}</option>
						{/* FOR BELOW, NEED TO ADD LOGIC TO CHECK WHAT POSITION IN THE MONTH THE DAY IS, FOR EXAMPLE IF IT'S THE LAST WEDNESDAY BUT THERE'S 5 WEDNESDAYS IN A MONTH, BUT THE NEXT MONTH THERE'S ONLY 4 WEDNESDAYS, NEXT MONTH USES 4, ETC. */}
						<option value='custom'>Custom</option>
					</select>
				</label>
				<div className='start-end-container'>
					<label>
						<div>Start: </div>
						<select
							name='start'
							value={selectedStart.format('YYYY-MM-DD')}
							onChange={handleChange}
						>
							{durationArr.map((day, index) => {
								return (
									<option
										key={index}
										value={dayjs(day).format('YYYY-MM-DD')}
									>
										{dayjs(day).format('MMMM DD')}
									</option>
								);
							})}
						</select>
					</label>
					<label>
						<div>End: </div>
						<select
							name='end'
							value={selectedEnd.format('YYYY-MM-DD')}
							onChange={handleChange}
						>
							{durationArr.map((day, index) => {
								return (
									<option
										key={index}
										value={dayjs(day).format('YYYY-MM-DD')}
										disabled={dayjs(day).isBefore(
											selectedStart.add(1, 'day')
										)}
										className={
											dayjs(day).isBefore(
												selectedStart + 1
											)
												? 'disabled-option'
												: null
										}
									>
										{dayjs(day).format('MMMM DD')}
									</option>
								);
							})}
						</select>
					</label>
				</div>
			</div>
			<div className='save-cancel-btns'>
				<button type='submit'>Save</button>{' '}
				<button
					type='button'
					onClick={() => {
						setRecurrenceModalOpen(false);
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default RecurrenceForm;
