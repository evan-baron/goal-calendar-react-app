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
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedStart, setSelectedStart] = useState(dayjs(selectedDay.date));
	const [selectedEnd, setSelectedEnd] = useState(
		dayjs(selectedCalendar.endDate)
	);

	const day = dayjs(selectedDay.date).format('dddd');
	const start = dayjs(selectedCalendar.startDate).format('YYYY-MM-DD');
	const end = dayjs(selectedCalendar.endDate).format('YYYY-MM-DD');
	const length = dayjs(selectedCalendar.endDate).diff(
		dayjs(selectedCalendar.startDate),
		'day'
	);

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
			console.log(dayjs(selectedCalendar.endDate).format('MMMM DD'));
		}
	};

	return (
		<form className='recurrence-form' onSubmit={handleSubmit}>
			<div
				className='recurrence-title'
				onClick={() => setRecurrenceModalOpen((prev) => (prev = !prev))}
			>
				Repeat Task
			</div>
			<div className='recurrence-options'>
				<label className='option'>
					<select
						id='dropdown'
						name='option'
						value={selectedOption}
						onChange={handleChange}
					>
						<option value=''>Every day</option>
						<option value='option1'>Every other day</option>
						<option value='option2'>Every {day}</option>
						<option value='option3'>Every other {day}</option>
						{/* FOR BELOW, NEED TO ADD LOGIC TO CHECK WHAT POSITION IN THE MONTH THE DAY IS, FOR EXAMPLE IF IT'S THE LAST WEDNESDAY BUT THERE'S 5 WEDNESDAYS IN A MONTH, BUT THE NEXT MONTH THERE'S ONLY 4 WEDNESDAYS, NEXT MONTH USES 4, ETC. */}
						<option value='option4'>Custom</option>
					</select>
					<input type='checkbox'></input>
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
										className={dayjs(day).isBefore(selectedStart + 1) ? 'disabled-option' : null}
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
