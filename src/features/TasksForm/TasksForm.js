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
			'Organize inbox',
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
		selectedCalendar.days[calendarIndex].tasks.length === 0
			? [
					{
						id: uuidv4(),
						task: null,
						points: 1,
						completed: false,
						recurring: {
							recurring: false,
							type: null,
							startDate: null,
							endDate: null,
						},
					},
			  ]
			: selectedCalendar.days[calendarIndex].tasks.map(task => ({
				...task,
				id: task.id || uuidv4(),
			}))
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);

	const addTask = () => {
		setDailyTasks([
			...dailyTasks,
			{
				id: uuidv4(),
				task: null,
				points: 1,
				completed: false,
				recurring: {
					recurring: false,
					type: null,
					startDate: null,
					endDate: null,
					hasBeenRecurred: false
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
		const currentDayTasks = selectedCalendar.days[calendarIndex].tasks;
		setDailyTasks(
			currentDayTasks.length === 0
				? [
						{
							id: uuidv4(),
							task: null,
							points: 1,
							completed: false,
							recurring: {
								recurring: false,
								type: null,
								startDate: null,
								endDate: null,
								hasBeenRecurred: false,
							},
						},
				  ]
				: currentDayTasks.map(task => ({
						...task,
						id: task.id || uuidv4(),
				  }))
		);
	}, [selectedDay]); // This effect runs when selectedDay changes to sync the tasks state

	const validateTasks = () => {
		const noTasks = dailyTasks.some((task) => task.task === null || task.task.trim() === '')
		if (noTasks) {
			return true
		} else {
			return false
		}
	}

	const acceptChanges = () => {
		let updatedDays = selectedCalendar.days.map((day) => ({
			...day,
			tasks: [...day.tasks],
		}));

		updatedDays[calendarIndex].tasks = dailyTasks;

		let daysWithRecurring = [];
		let recurringTasksArr = [];

		dailyTasks.forEach((day) => {
			if (day.recurring.recurring) {
				if (!day.recurring.hasBeenRecurred) {
					daysWithRecurring.push(day)
					recurringTasksArr.push({task: day,
						type: day.recurring.type,
						dates: []
					})
				}
			}
		})

		console.log(recurringTasksArr);

		for (let i = 0; i < daysWithRecurring.length; i++) {
			const startDayIndex = dayjs(daysWithRecurring[i].recurring.startDate).day();
			const startDateIndex = selectedCalendar.days.findIndex((day) => day.date === daysWithRecurring[i].recurring.startDate);
			const endDateIndex = selectedCalendar.days.findIndex((day) => day.date === daysWithRecurring[i].recurring.endDate);

			for (let j = startDateIndex; j <= endDateIndex; j++) {
				if (selectedCalendar.days[j].date !== selectedDay.date) {
					switch (daysWithRecurring[i].recurring.type) {
						case 'daily':
							recurringTasksArr[i].dates.push(selectedCalendar.days[j])
							break;
						case 'alternate':
							if (startDayIndex % 2 === dayjs(selectedCalendar.days[j].date).day() % 2) {
								recurringTasksArr[i].dates.push(selectedCalendar.days[j])
							}
							break;
						case 'weekly':
							if (startDayIndex === dayjs(selectedCalendar.days[j].date).day()) {
								recurringTasksArr[i].dates.push(selectedCalendar.days[j])
							}
							break;
						case 'biweekly':
							const weeksDifference = dayjs(selectedCalendar.days[j].date).diff(dayjs(daysWithRecurring[i].recurring.startDate), 'week');

							if (weeksDifference % 2 === 0 && startDayIndex === dayjs(selectedCalendar.days[j].date).day()) {
								recurringTasksArr[i].dates.push(selectedCalendar.days[j])
							}
							break;
					}
				}
			}
		}

		console.log('updated recurring tasks arr: ', recurringTasksArr);

		console.log('updatedDays', updatedDays);

		for (let i = 0; i < recurringTasksArr.length; i++) {
			for (let j = 0; j < recurringTasksArr[i].dates.length; j++) {
				updatedDays = updatedDays.map((day) => {
					if (day.date === recurringTasksArr[i].dates[j].date) {
						const taskExists = day.tasks.some((task) => task.id === recurringTasksArr[i].task.id)

						if (!taskExists) {
							day.tasks = [
								...day.tasks,
								recurringTasksArr[i].task
							]
						}
					} 
					return day;
				})
			}
		}

		console.log('new updated days', updatedDays);

		for (let i = 0; i < updatedDays.length; i++) {
			for (let j = 0; j < updatedDays[i].tasks.length; j++) {
				if (updatedDays[i].tasks[j].recurring.recurring && !updatedDays[i].tasks[j].recurring.hasBeenRecurred) {
					updatedDays[i].tasks[j].recurring.hasBeenRecurred = true;
				}
			}
		}

		console.log('after updating has been recurred: ', updatedDays);

		dispatch(
			updateCalendar({
				...selectedCalendar,
				days: updatedDays,
		}));

		setTasksModalOpen(false);
		setModalType(null);
		setIsModalOpen(false);
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

		if (!isEqual(dailyTasks, currentTasks)) {
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
							taskId={task.id}
							removeTask={removeTask}
							setDailyTasks={setDailyTasks}
							setIsDirty={setIsDirty}
							setIsModalOpen={setIsModalOpen}
							setModalType={setModalType}
							setRecurrenceModalOpen={setRecurrenceModalOpen}
							setSelectedTask={setSelectedTask}
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
				selectedTask={selectedTask}
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
