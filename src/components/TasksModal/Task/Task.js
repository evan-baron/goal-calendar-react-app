import React, { useMemo } from 'react';
import './Task.css';
import { DeleteForeverOutlined, EventRepeat } from '@mui/icons-material';

const Task = ({
	day,
	dailyTasks,
	setDailyTasks,
	easterEgg,
	editMode,
	task,
	removeTask,
	taskIndex,
}) => {
	const firstTaskPlaceholder = useMemo(() => {
		return taskIndex === 0 ? easterEgg() : null;
	}, [taskIndex]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		const updatedTasks = dailyTasks.map((task, index) => {
			if (index === taskIndex) {
				return {
					...task,
					[name]: type === 'checkbox' ? checked : value,
				};
			}
			return task;
		});
		setDailyTasks(updatedTasks);
	};

	return (
		<div className='task-container'>
			<div className='task-input-container'>
				{editMode ? (
					<input
						className='task-input'
						type='text'
						placeholder={firstTaskPlaceholder}
						maxLength={60}
						value={task || ''}
						name='task'
						onChange={handleChange}
					/>
				) : (
					<div className='task-div'>{task}</div>
				)}
				<label className={editMode ? 'point-value' : ''} name='points'>
					{editMode ? 'Point Value:' : 'Points:'}
				</label>
				{editMode ? (
					<input
						className='points'
						type='number'
						min='0'
						max='3'
						value={dailyTasks[taskIndex].points || 1}
						name='points'
						onChange={handleChange}
					/>
				) : (
					<div>{dailyTasks[taskIndex].points}</div>
				)}
				{editMode ? (
					<DeleteForeverOutlined
						className='remove-task-btn'
						onClick={() => removeTask(dailyTasks[taskIndex].id)}
						sx={{
							color: 'rgb(200, 200, 200)',
							height: '2rem',
							width: '2rem',
						}}
					/>
				) : (
					<input type='checkbox' className='task-checkbox' name='completed' checked={dailyTasks[taskIndex].completed} onChange={handleChange} />
				)}
			</div>
			{editMode && <EventRepeat className='event-repeat'/>}
			{/* <div className='recurring'>Apply to all {day}s?</div> */}
		</div>
	);
};

export default Task;
