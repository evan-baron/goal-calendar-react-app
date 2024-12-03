import React from 'react';
import { useState } from 'react';
import './TasksForm.css';
import Task from '../../components/TasksModal/Task/Task';

const TasksForm = ({ selectedDay }) => {
	const [tasks, setTasks] = useState([]);

	const addTask = () => {
		console.log(selectedDay.tasks)
		setTasks([...tasks, {test: 'test'}])
		console.log(tasks);
	}

	const removeTask = (taskIndex) => {
		setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskIndex));
	}

	return (
		<div className='tasks-form-container'>
			{[
				...Array(tasks.length)].map((_, taskIndex) => {
					return (
						<Task 
							key={taskIndex}
							taskIndex={taskIndex}
							removeTask={removeTask}
						/>
					)
				})
			}
			<button 
				className='add-task-btn'
				onClick={addTask}
			>Add Task</button>
		</div>
	);
};

export default TasksForm;
