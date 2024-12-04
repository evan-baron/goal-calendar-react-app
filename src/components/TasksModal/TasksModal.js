import React from 'react';
import './TasksModal.css';
import dayjs from 'dayjs';
import TasksForm from '../../features/TasksForm/TasksForm';
import Divider from '../Divider/Divider';

const TasksModal = ({ editMode, selectedCalendar, selectedDay, setTasksModalOpen }) => {
	return (
		<div className='tasks-modal-overlay'>
			<div className='tasks-modal-content'>
				<div 
					className='tasks-title-container'
					onClick={() => setTasksModalOpen(false)}>
					<div className='tasks-title'>Tasks for</div>
					<div className='tasks-date'>{dayjs(selectedDay.date).format('dddd, MMMM DD')}</div>
				</div>
				<Divider />
				<TasksForm 
					selectedCalendar={selectedCalendar}
					selectedDay={selectedDay}
				/>
			</div>
		</div>
	);
};

export default TasksModal;