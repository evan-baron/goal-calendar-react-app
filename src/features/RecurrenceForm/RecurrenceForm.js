import React, { useState } from 'react';
import './RecurrenceForm.css';
import dayjs from 'dayjs';

const RecurrenceForm = ({ selectedCalendar, selectedDay, setRecurrenceModalOpen }) => {
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedStart, setSelectedStart] = useState(dayjs(selectedDay.date).format('MMMM DD'));
	const [selectedEnd, setSelectedEnd] = useState(dayjs(selectedCalendar.endDate).format('MMMM DD'));

	const day = dayjs(selectedDay.date).format('dddd');
	const start = dayjs(selectedCalendar.startDate).format('YYYY-MM-DD');
	const end = dayjs(selectedCalendar.endDate).format('YYYY-MM-DD');
	const length = dayjs(selectedCalendar.endDate).diff(dayjs(selectedCalendar.startDate), 'day');
	let durationArr = ['', ...selectedCalendar.tasks.map(task => task.date)];

	const handleChange = (e) => {
		setSelectedOption(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(selectedDay);
		console.log(selectedCalendar);
		console.log(start, end, length, durationArr);
	}

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
						<select defaultValue={selectedStart}>
							{durationArr.map((day) => {
								return (
									<option>{day === '' ? '' : dayjs(day).format('MMMM DD')}</option>
								)
							})}
						</select>
					</label>
					<label>
						<div>End: </div>
						<select defaultValue={selectedEnd}>
							{durationArr.map((day) => {
								return (
									<option>{day === '' ? '' : dayjs(day).format('MMMM DD')}</option>
								)
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
