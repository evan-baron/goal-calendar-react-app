import React from 'react';
import './TasksModal.css';
import dayjs from 'dayjs';
import TasksForm from '../../features/TasksForm/TasksForm';
import Divider from '../Divider/Divider';

const TasksModal = ({
	editMode,
	isDirty,
	setIsDirty,
	isOpen,
	selectedCalendar,
	selectedDay,
	setTasksModalOpen,
	currentTasks,
}) => {
	if (!isOpen) return null;

	const day = dayjs(selectedDay.date).format('dddd');

	return (
		<div className='tasks-modal-overlay'>
			<div className='tasks-modal-content'>
				<div
					className='tasks-title-container'
				>
					<div className='tasks-title'>Tasks{!editMode && ' due'} for</div>
					<div className='tasks-date'>
						{dayjs(selectedDay.date).format('dddd, MMMM DD')}
					</div>
				</div>
				<Divider />
				<TasksForm
					day={day}
					editMode={editMode}
					isDirty={isDirty}
					setIsDirty={setIsDirty}
					selectedCalendar={selectedCalendar}
					selectedDay={selectedDay}
					setTasksModalOpen={setTasksModalOpen}
					currentTasks={currentTasks}
				/>
			</div>
		</div>
	);
};

export default TasksModal;
