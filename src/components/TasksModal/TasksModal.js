import React from 'react';
import './TasksModal.css';
import dayjs from 'dayjs';

const TasksModal = ({ editMode, selectedDay, setTasksModalOpen }) => {
	return (
		<div className='tasks-modal-overlay'>
			<div className='tasks-modal-content'>
				<div onClick={() => setTasksModalOpen(false)}>
					{editMode ? `Set Tasks for ${dayjs(selectedDay.date).format('MMMM DD')}` : `Tasks Due for ${dayjs(selectedDay.date).format('MMMM DD')}`}
				</div>
			</div>
		</div>
	);
};

export default TasksModal;
