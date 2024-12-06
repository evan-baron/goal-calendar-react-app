import React from 'react';
import { useState, useEffect } from 'react';
import './TasksForm.css';
import { useDispatch } from 'react-redux';
import { updateCalendar } from '../CalendarForm/calendarSlice';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import Task from '../../components/TasksModal/Task/Task';
import Modal from '../../components/Modal/Modal';

const TasksForm = ({
	isDirty,
	setIsDirty,
	selectedCalendar,
	selectedDay,
	setTasksModalOpen,
	currentTasks,
}) => {
	const dispatch = useDispatch();
	const calendarIndex = selectedCalendar.tasks.findIndex(
		(c) => c.date === dayjs(selectedDay.date).format('YYYY-MM-DD')
	);

	const easterEgg = () => {
		const easterEggArr = [
			'Drink 100oz of Water',
			'Run 1 mile',
			'Eat a piece of candy',
			'Do 20 push-ups',
			'Organize email',
			'Do laundry',
			'Fill out expense report',
			'Upper-body workout day',
			'Write 10 pages in book',
			'Read for 30 minutes',
			'Subscribe to Cat Facts!',
			'Call parents',
			'Do 5 modules',
			'Watch 3 training videos',
		];

		return easterEggArr[Math.floor(Math.random() * easterEggArr.length)];
	};

	const [dailyTasks, setDailyTasks] = useState(
		selectedCalendar.tasks[calendarIndex].tasks.daily.length === 0
			? [
					{
						task: easterEgg(),
						points: 1,
						completed: false,
					},
			  ]
			: selectedCalendar.tasks[calendarIndex].tasks.daily
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(null);

	const addTask = () => {
		setDailyTasks([
			...dailyTasks,
			{
				task: null,
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
	};

	const rejectChanges = () => {
		setModalType(null);
		setIsModalOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isEqual(dailyTasks, currentTasks.daily)) {
			console.log(
				'daily tasks: ',
				dailyTasks,
				'current tasks: ',
				currentTasks.daily
			);
			setModalType('save-changes');
			setIsModalOpen(true);
		} else {
			setTasksModalOpen(false);
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
				<button
					className='add-task-btn'
					type='button'
					onClick={addTask}
				>
					Add Task
				</button>
				<div className='save-cancel-btns'>
					<button type='submit'>Save</button>{' '}
					<button
						type='button'
						onClick={() => {
							setIsDirty(false);
							setTasksModalOpen(false);
						}}
					>
						Cancel
					</button>
				</div>
			</form>
			<Modal
				isOpen={isModalOpen}
				onConfirm={acceptChanges}
				onClose={rejectChanges}
				modalType={modalType}
			/>
		</>
	);
};

export default TasksForm;
