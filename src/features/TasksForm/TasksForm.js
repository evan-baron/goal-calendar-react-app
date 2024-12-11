import React from 'react';
import { useState, useEffect } from 'react';
import './TasksForm.css';
import { useDispatch } from 'react-redux';
import { updateCalendar } from '../CalendarForm/calendarSlice';
import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import { v4 as uuidv4 } from 'uuid';
import Task from '../../components/TasksModal/Task/Task';
import Modal from '../../components/Modal/Modal';
import RecurrenceModal from '../../components/RecurrenceModal/RecurrenceModal';

const TasksForm = ({
	editMode,
	isDirty,
	setIsDirty,
	selectedCalendar,
	selectedDay,
	setTasksModalOpen,
	currentTasks,
}) => {
	const dispatch = useDispatch();
	const calendarIndex = selectedCalendar.days.findIndex(
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
		selectedCalendar.days[calendarIndex].tasks.daily.length === 0
			? [
					{
						id: uuidv4(),
						task: null,
						points: 1,
						completed: false,
						recurring: {
							type: null,
							startDate: null,
							endDate: null,
							daysOfWeek: []
						},
					},
			  ]
			: selectedCalendar.days[calendarIndex].tasks.daily.map(task => ({
				...task,
				id: task.id || uuidv4(),
			}))
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(null);

	const addTask = () => {
		setDailyTasks([
			...dailyTasks,
			{
				id: uuidv4(),
				task: null,
				points: 1,
				completed: false,
				recurring: {
					type: null,
					startDate: null,
					endDate: null,
					daysOfWeek: []
				}
			},
		]);
	};

	const removeTask = (taskId) => {
		setDailyTasks((prevTasks) =>
			prevTasks.filter((task) => task.id !== taskId)
		);
	};

	useEffect(() => {
	}, [dailyTasks]);

	const validateTasks = () => {
		const noTasks = dailyTasks.some((task) => task.task === null || task.task.trim() === '')
		if (noTasks) {
			return true
		} else {
			return false
		}
	}

	const acceptChanges = () => {
		const updatedTasks = [...selectedCalendar.days];
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
				days: updatedTasks,
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

		if (validateTasks()) {
			setModalType('tasks-empty');
			setIsModalOpen(true);
			return
		}

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
				{dailyTasks.map((task, taskIndex) => {
					return (
						<Task
							dailyTasks={dailyTasks}
							easterEgg={easterEgg}
							editMode={editMode}
							key={task.id}
							removeTask={removeTask}
							setDailyTasks={setDailyTasks}
							setIsDirty={setIsDirty}
							setRecurrenceModalOpen={setRecurrenceModalOpen}
							task={task.task}
							taskIndex={taskIndex}
						/>
					);
				})}
				{editMode && <button
					className='add-task-btn'
					type='button'
					onClick={addTask}
				>
					Add Task
				</button>}
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
			<RecurrenceModal 
				dailyTasks={dailyTasks}
				setDailyTasks={setDailyTasks}
				isOpen={recurrenceModalOpen}
				selectedDay={selectedDay}
				selectedCalendar={selectedCalendar}
				setRecurrenceModalOpen={setRecurrenceModalOpen}
				setIsModalOpen={setIsModalOpen}
				setModalType={setModalType}		
			/>
		</>
	);
};

export default TasksForm;
