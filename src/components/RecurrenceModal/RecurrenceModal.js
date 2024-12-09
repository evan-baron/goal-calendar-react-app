import React from 'react';
import './RecurrenceModal.css';
import dayjs from 'dayjs';
import RecurrenceForm from '../../features/RecurrenceForm/RecurrenceForm';

const RecurrenceModal = ({ isOpen, selectedDay, setRecurrenceModalOpen }) => {
	if (!isOpen) return null;

	const day = dayjs(selectedDay.date);

	return (
		<div className='recurrence-modal-overlay'>
			<div className='recurrence-modal-content'>
				<RecurrenceForm 
					setRecurrenceModalOpen={setRecurrenceModalOpen}
					day={day}
				/>
			</div>
		</div>
	);
};

export default RecurrenceModal;
