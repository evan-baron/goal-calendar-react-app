import React from 'react';
import './Task.css';
import { DeleteForeverOutlined } from '@mui/icons-material';

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
				{/* <button
					className='remove-task-btn'
					onClick={() => removeTask(taskIndex)}
				>
					Remove
				</button> */}
				{/* Using icon instead of words for easier on the eyes purposes */}
				<DeleteForeverOutlined 
					className='remove-task-btn'
					onClick={() => removeTask(taskIndex)}
					sx={{
						color: 'rgb(200, 200, 200)',
						height: '2rem',
						width: '2rem'
					}}
				/>
			</div>
			<div className='recurring'>Recurring?</div>
		</div>
	);
};

export default Task;
