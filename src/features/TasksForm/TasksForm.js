import React from 'react';
import { useState, useEffect } from 'react';
import './TasksForm.css';
import { useDispatch } from 'react-redux';
import { updateCalendar } from '../CalendarForm/calendarSlice';
import dayjs from 'dayjs';
import Task from '../../components/TasksModal/Task/Task';
import Modal from '../../components/Modal/Modal';

const TasksForm = ({ isDirty, setIsDirty, selectedCalendar, selectedDay, setTasksModalOpen }) => {
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(null);

	const addTask = () => {
		setIsDirty(true);
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

	const acceptChanges = () => {
		switch(modalType) {
			case 'save-changes':
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

				setIsModalOpen(false);
				setModalType(null);
				setIsDirty(false);
				setTasksModalOpen(false);
				break;
		}
	}

	const rejectChanges = () => {

	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isDirty) {
			setModalType('save-changes');
			setIsModalOpen(true);
		} else {
			//ADD LOGIC IN HERE FOR IF NO CHANGES MADE TO TASKS
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className='tasks-form-container'>
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
				<button className='add-task-btn' type='button' onClick={addTask}>
					Add Task
				</button>
				<div className='save-cancel-btns'>
					<button type='submit'>Save</button>{' '}
					{/* THIS WILL BE THE ON SUBMIT BUTTON FOR THE FORM */}
					<button type='button'>Cancel</button>
				</div>
			</form>
			<Modal 
				isOpen={isModalOpen}
				onConfirm={acceptChanges}
				onReject={rejectChanges}
				modalType={modalType}
			/>
		</>
	);
};

export default TasksForm;
