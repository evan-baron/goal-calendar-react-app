import React from 'react';
import { useState, useEffect } from 'react';
import './TasksForm.css';
import Task from '../../components/TasksModal/Task/Task';

const TasksForm = ({ selectedDay }) => {
	const [tasks, setTasks] = useState([{
											task: 'Task 1234',
											points: 1,
											completed: false
										}]);

	const addTask = (taskIndex) => {
		setTasks([...tasks, {
			task: `Task ${tasks.length + 1}`,
			points: 1,
			completed: false
		}])
	}

	const removeTask = (taskIndex) => {
		setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskIndex));
	}

	useEffect(() => {
		console.log(tasks)
	}, [tasks])

	return (
		<div className='tasks-form-container'> {/* THIS NEEDS TO BE A FORM NOT A DIV */}
			{[
				...Array(tasks.length)].map((_, taskIndex) => {
					return (
						<Task 
							key={taskIndex}
							task={tasks[taskIndex].task}
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
			<div className='save-cancel-btns'>
				<button>Save</button> {/* THIS WILL BE THE ON SUBMIT BUTTON FOR THE FORM */}
				<button>Cancel</button>
			</div>
		</div>
	);
};

export default TasksForm;
