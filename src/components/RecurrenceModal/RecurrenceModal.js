import React from 'react';
import './RecurrenceModal.css';
import dayjs from 'dayjs';
import RecurrenceForm from '../../features/RecurrenceForm/RecurrenceForm';

const RecurrenceModal = ({ isOpen, selectedCalendar, selectedDay, setRecurrenceModalOpen }) => {
	if (!isOpen) return null;

	return (
		<div className='recurrence-modal-overlay'>
			<div className='recurrence-modal-content'>
				<RecurrenceForm 
					setRecurrenceModalOpen={setRecurrenceModalOpen}
					selectedCalendar={selectedCalendar}
					selectedDay={selectedDay}
				/>
			</div>
		</div>
	);
};

export default RecurrenceModal;
