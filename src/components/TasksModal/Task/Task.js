import React from 'react';
import './Task.css';

const Task = ({ task, removeTask, taskIndex }) => {
	return (
		<div className='task-container'>
			<div className='task-input-container'>
				<input
					className='task-input'
					type='text'
					placeholder={task}
					maxLength={60}
				/>
				<label className='point-value' name='points'>
					Point Value:
				</label>
				<input className='points' type='number' min='1' max='3' value={1} />
				<button
					className='remove-task-btn'
					onClick={() => removeTask(taskIndex)}
				>
					Remove
				</button>
			</div>
			<div className='recurring'>Recurring?</div>
		</div>
	);
};

export default Task;
