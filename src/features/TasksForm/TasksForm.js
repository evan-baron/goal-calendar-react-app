import React from 'react';
import { useState, useEffect } from 'react';
import './TasksForm.css';
import { useDispatch } from 'react-redux';
import { updateCalendar } from '../CalendarForm/calendarSlice';
import dayjs from 'dayjs';
import Task from '../../components/TasksModal/Task/Task';

const TasksForm = ({ selectedCalendar, selectedDay }) => {
	const dispatch = useDispatch();
	const calendarIndex = selectedCalendar.tasks.findIndex(
		(c) => c.date === dayjs(selectedDay.date).format('YYYY-MM-DD')
	);

	const [dailyTasks, setDailyTasks] = useState(
		selectedCalendar.tasks[calendarIndex].tasks.daily.length === 0
			? [
					{
						task: 'Task 1234',
						points: 1,
						completed: false,
					},
			  ]
			: selectedCalendar.tasks[calendarIndex].tasks.daily
	);

	const addTask = (taskIndex) => {
		setDailyTasks([
			...dailyTasks,
			{
				task: `Task ${dailyTasks.length + 1}`,
				points: 1,
				completed: false,
			},
		]);
	};

	const removeTask = (taskIndex) => {
		setDailyTasks((prevTasks) =>
			prevTasks.filter((_, index) => index !== taskIndex)
		);
	};

	useEffect(() => {
		// console.log(tasks)
	}, [dailyTasks]);

	const handleSubmit = () => {
		console.log('selected calendar: ', selectedCalendar);
		console.log('calendar index: ', calendarIndex);
		console.log(
			'selected calendar selected day tasks object: ',
			selectedCalendar.tasks[calendarIndex].tasks.daily
		);
		console.log('selected day tasks: ', selectedDay.tasks);
		console.log('dailyTasks: ', dailyTasks);

		//test adding task to selectedDay.tasks AND selectedCalendar.tasks[calendarIndex].tasks to see if it's the same

		// setSelectedDay(selectedCalendar.tasks[calendarIndex]);

		const updatedTasks = [...selectedCalendar.tasks];
		updatedTasks[calendarIndex] = {
			...updatedTasks[calendarIndex],
			tasks: {
				...updatedTasks[calendarIndex].tasks,
				daily: dailyTasks,
			},
		};

		dispatch(
			updateCalendar({
				...selectedCalendar,
				tasks: updatedTasks,
			})
		);

		console.log('Updated tasks dispatched: ', updatedTasks);

		// const updatedTasks = [...tasks, tasks[calendarIndex].tasks.daily = dailyTasks]

		// console.log('updatedTasks: ', updatedTasks)
	};

	return (
		<div className='tasks-form-container'>
			{' '}
			{/* THIS NEEDS TO BE A FORM NOT A DIV */}
			{[...Array(dailyTasks.length)].map((_, taskIndex) => {
				return (
					<Task
						key={taskIndex}
						task={dailyTasks[taskIndex].task}
						taskIndex={taskIndex}
						removeTask={removeTask}
					/>
				);
			})}
			<button className='add-task-btn' onClick={addTask}>
				Add Task
			</button>
			<div className='save-cancel-btns'>
				<button onClick={handleSubmit}>Save</button>{' '}
				{/* THIS WILL BE THE ON SUBMIT BUTTON FOR THE FORM */}
				<button>Cancel</button>
			</div>
		</div>
	);
};

export default TasksForm;
