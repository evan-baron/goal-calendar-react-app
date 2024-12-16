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
	const updatedCalendar = selectedCalendar;

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

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskId, setTaskId] = useState(null);
	const [tasks, setTasks] = useState(
		updatedCalendar.days[calendarIndex].tasks.length === 0 ? 
		[
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
	  : updatedCalendar.days[calendarIndex].tasks
	)

	const addTask = () => {
		setTasks([...tasks, 
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
		])
	};

	const removeTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
		setTaskId(null);
	};

	const validateTasks = () => {

	}

	const acceptChanges = () => {

	};

	const rejectChanges = () => {

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(updatedCalendar);
		console.log(tasks);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className='tasks-form-container'>
				{tasks.map((task, taskIndex) => {
					return (
						<Task
							task={task}
							taskIndex={taskIndex}
							easterEgg={easterEgg}
							editMode={editMode}
							removeTask={removeTask}
							setTaskId={setTaskId}
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
