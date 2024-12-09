import React, { useState } from 'react';
import './RecurrenceForm.css';

const RecurrenceForm = ({ day, setRecurrenceModalOpen }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = (e) => {
		setSelectedOption(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('test');
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
						<option value='option2'>Every {day.format('dddd')}</option>
						<option value='option3'>Every other {day.format('dddd')}</option>
						{/* FOR BELOW, NEED TO ADD LOGIC TO CHECK WHAT POSITION IN THE MONTH THE DAY IS, FOR EXAMPLE IF IT'S THE LAST WEDNESDAY BUT THERE'S 5 WEDNESDAYS IN A MONTH, BUT THE NEXT MONTH THERE'S ONLY 4 WEDNESDAYS, NEXT MONTH USES 4, ETC. */}
						<option value='option4'>Once a month</option>
					</select>
					<input type='checkbox'></input>
				</label>
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
