import React from 'react';
import './RecurrenceModal.css';
import RecurrenceForm from '../../features/RecurrenceForm/RecurrenceForm';

const RecurrenceModal = ({
	dailyTasks,
	setDailyTasks,
	selectedTask,
	isOpen,
	setIsRecurring,
	setRecurringStart,
	setRecurringEnd,
	setRecurringType,
	selectedCalendar,
	selectedDay,
	setIsModalOpen,
	setModalType,
	setRecurrenceModalOpen,
}) => {
	if (!isOpen) return null;

	return (
		<div className='recurrence-modal-overlay'>
			<div className='recurrence-modal-content'>
				<RecurrenceForm
					dailyTasks={dailyTasks}
					setDailyTasks={setDailyTasks}
					selectedTask={selectedTask}
					setIsRecurring={setIsRecurring}
					setRecurringStart={setRecurringStart}
					setRecurringEnd={setRecurringEnd}
					setRecurringType={setRecurringType}
					setRecurrenceModalOpen={setRecurrenceModalOpen}
					selectedCalendar={selectedCalendar}
					selectedDay={selectedDay}
					setIsModalOpen={setIsModalOpen}
					setModalType={setModalType}
				/>
			</div>
		</div>
	);
};

export default RecurrenceModal;
