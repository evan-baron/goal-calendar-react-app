import React, { useMemo } from 'react';
import './Task.css';
import { DeleteForeverOutlined, EventRepeat, Loop } from '@mui/icons-material';

const Task = ({
	task,
	taskIndex,
	easterEgg,
	editMode,
	removeTask,
	setTaskId
}) => {
	const { id } = task;
	const firstTaskPlaceholder = useMemo(() => {
		return taskIndex === 0 ? easterEgg() : null;
	}, [taskIndex]);

	const handleChange = (e) => {

	};

	return (
		<div className='task-container'>
			<div className='task-input-container'>
				{/* <Loop 
					className='recurring-icon'
					sx={{ 
						transform: 'scale(-1, 1) rotate(135deg)',
						color: 'rgb(0, 200, 0)'
					}}
				/> */}
				<input
					className='task-input'
					type='text'
					placeholder={firstTaskPlaceholder}
					value={task.task}
					maxLength={60}
					name='task'
					onChange={handleChange}
				/>
				<div className='task-div'></div>
				<label className={editMode ? 'point-value' : 'points-div'} name='points'>
					{editMode ? 'Point Value:' : 'Points:'}
				</label>
				<input
					className='points'
					type='number'
					min='0'
					max='3'
					name='points'
					onChange={handleChange}
				/>
				<DeleteForeverOutlined
					className='remove-task-btn'
					onClick={() => {
						setTaskId(id)
						removeTask(id)
					}}
					sx={{
						color: 'rgb(200, 200, 200)',
						height: '2rem',
						width: '2rem',
						'&:hover': {
							color: 'rgb(175, 175, 175)'
						}
					}}
				/>
			</div>
			<EventRepeat
				className='event-repeat'
				sx={{
					color: 'rgb(200, 200, 200)',
					'&:hover': { color: 'rgb(175, 175, 175)' },
				}}
			/>
		</div>
	);
};

export default Task;
