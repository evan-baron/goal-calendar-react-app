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
		// the below code only updates the selected day's tasks... it does not have anything to do with recurrence... 
		updatedTasks[calendarIndex] = {
			...updatedTasks[calendarIndex],
			tasks: dailyTasks,
		};

		//////////////////////////////////////////////////////////////
		//                                                          //
		//          REMOVED BELOW RECURRING LOGIC FOR NOW           //
		//                                                          //
		//////////////////////////////////////////////////////////////

		// // now need to check for recurring. 
		// console.log('the total daily tasks: ', dailyTasks);
		// const dailyTasksWithRecurring = dailyTasks.filter((task) => task.recurring.recurring);
		// console.log('the tasks that have recurrence: ', dailyTasksWithRecurring);
		// const dailyTasksWithRecurringNotRecurred = dailyTasksWithRecurring.filter((task) => !task.recurring.hasBeenRecurred)
		// console.log('the tasks that havent been recurred yet: ', dailyTasksWithRecurringNotRecurred);

		// // but what about the start dates and end dates of these days? couldn't there be multiple different start dates and end dates? yes, this means nested loops yayyyy
		// // so let's create a separate array for each task with recurring that hasn't been recurred yet
		// let recurringTasksArrs = [];
		// for (let i = 0; i < dailyTasksWithRecurringNotRecurred.length; i++) {
		// 	recurringTasksArrs.push([])
		// }
		// console.log('the separate arrays so far: ',recurringTasksArrs);

		// // OK, now that we have the arrays for each task with recurring that hasn't been recurred yet, we can start pushing the calendar days that match the ranges into each array accordingly... going to involve a nested for loop... we'll need to look at the tasks that havent been recurred yet and loop through that, but for each task in there, we need to identify the start date and end dates and push those days into it's matching array in the recurringTaskArrs. To begin, let's first look at the selected calendar:
		// console.log('the selected calendar: ', selectedCalendar);

		// // we're going to need the index of the calendar day that the start date for the task falls on
		// // for now, we'll just use the first task but we'll put this into a loop to iterate through every task once we're done
		// // here's the start date of the first task that hasn't been recurred yet:
		// const taskStartDate = dailyTasksWithRecurringNotRecurred[0].recurring.startDate
		// console.log('the start date of the first task: ', taskStartDate);

		// // we also need the end date:
		// const taskEndDate = dailyTasksWithRecurringNotRecurred[0].recurring.endDate
		// console.log('the end date of the first task: ', taskEndDate);

		// // time to grab the index of the start date from the selected calendar
		// const taskStartDateIndex = selectedCalendar.days.findIndex((day) => day.date === taskStartDate);
		// console.log('the starting index in the selectedCalendar: ', taskStartDateIndex);

		// // let's grab the ending index as well
		// const taskEndDateIndex = selectedCalendar.days.findIndex((day) => day.date === taskEndDate);
		// console.log('the ending index in the selectedCalendar: ', taskEndDateIndex);

		// // now we can iterate and push days to the appropriate recurringTasksArrs
		// for (let i = taskStartDateIndex; i <= taskEndDateIndex; i++) {
		// 	// if doing alternate, we'll need to add in some extra steps here but we'll worry about that when we get there
		// 	recurringTasksArrs[0].push(selectedCalendar.days[i])
		// }
		
		// // let's see if that worked:
		// console.log('the first array in recurringTasksArrs should have days in it: ', recurringTasksArrs);

		// // it worked, let's reset the arrays for our next exercise
		// recurringTasksArrs[0] = [];

		// // ok now that we can iterate through one day, let's nest that loop inside of a loop that checks all of this for each task in dailyTasksWithRecurringNotRecurred
		// for (let i = 0; i < recurringTasksArrs.length; i++) {
		// 	const taskStartDate = dailyTasksWithRecurringNotRecurred[i].recurring.startDate;
		// 	const taskEndDate = dailyTasksWithRecurringNotRecurred[i].recurring.endDate
		// 	const taskStartDateIndex = selectedCalendar.days.findIndex((day) => day.date === taskStartDate);
		// 	const taskEndDateIndex = selectedCalendar.days.findIndex((day) => day.date === taskEndDate);

		// 	for (let j = taskStartDateIndex; j <= taskEndDateIndex; j++) {
		// 		// if doing alternate, we'll need to add in some extra steps here but we'll worry about that when we get there
		// 		const taskStartDateDayIndex = dayjs(taskStartDate).day();
		// 		const calendarDayDayIndex = dayjs(selectedCalendar.days[j].date).day();

		// 		switch (dailyTasksWithRecurringNotRecurred[i].recurring.type) {
		// 			case 'daily':
		// 				recurringTasksArrs[i].push(selectedCalendar.days[j]);
		// 				break;
		// 			case 'alternate':
		// 				if (taskStartDateDayIndex % 2 === calendarDayDayIndex % 2) {
		// 					recurringTasksArrs[i].push(selectedCalendar.days[j])
		// 				}
		// 				break;
		// 			case 'weekly':
		// 				if (taskStartDateDayIndex === calendarDayDayIndex) {
		// 					recurringTasksArrs[i].push(selectedCalendar.days[j])
		// 				}
		// 				break;
		// 			case 'biweekly':
		// 				const daysDifference = dayjs(selectedCalendar.days[j].date).startOf('day').diff(
		// 					dayjs(taskStartDate).startOf('day'),
		// 					'days'
		// 				);
		// 				const weeksDifference = Math.floor(daysDifference / 7);
						
		// 				if (weeksDifference % 2 === 0 && taskStartDateDayIndex === calendarDayDayIndex) {
		// 					recurringTasksArrs[i].push(selectedCalendar.days[j]);
		// 				}
		// 				break;
		// 		}
		// 	}
		// }

		// // let's see if it worked:
		// console.log('both arrays in recurringTasksArrs should be filled: ', recurringTasksArrs);

		// // now for the fun part: adding the tasks into the days. Let's start by first creating a new array from the selectedCalendar days. we can use this updatedDays to dispatch later...
		// let updatedDays = [...selectedCalendar.days.map((day) => ({ ...day, tasks: [...day.tasks] }))];
		// console.log('updated days arr: ', updatedDays);
		
		// // Now let's grab the recurring information from the original tasks
		// const recurringTaskInfo = dailyTasksWithRecurringNotRecurred[0];
		// console.log('task info: ', recurringTaskInfo);
		// const recurringTaskRecurringInfo = recurringTaskInfo.recurring;
		// console.log('task recurring info: ', recurringTaskRecurringInfo);
		
		// // Iterate through recurringTasksArrs (each array corresponds to a task)
		// for (let i = 0; i < recurringTasksArrs.length; i++) {
		// 	// Get the current recurring task
		// 	const currentTask = dailyTasksWithRecurringNotRecurred[i];
		
		// 	// Iterate through the days that the task applies to
		// 	for (let j = 0; j < recurringTasksArrs[i].length; j++) {
		// 		const recurringDay = recurringTasksArrs[i][j];
		
		// 		// Find the index of this day in updatedDays
		// 		for (let k = 0; k < updatedDays.length; k++) {
		// 			if (updatedDays[k].date === recurringDay.date) {
		// 				// Update the tasks for this day
		// 				const taskAlreadyExists = updatedDays[k].tasks.some(
		// 					(task) => task.id === currentTask.id
		// 				);
		
		// 				if (!taskAlreadyExists) {
		// 					updatedDays[k] = {
		// 						...updatedDays[k],
		// 						tasks: [...updatedDays[k].tasks, { ...currentTask }],
		// 					};
		// 				}
		// 				break; // Exit loop once the day is found
		// 			}
		// 		}
		// 	}
		// }
		// console.log('Updated days with recurring tasks: ', updatedDays);
		
		// // Update all tasks in updatedDays to set `hasBeenRecurred` to true
		// updatedDays = updatedDays.map((day) => ({
		// 	...day,
		// 	tasks: day.tasks.map((task) =>
		// 		task.recurring?.hasBeenRecurred === false
		// 			? {
		// 				  ...task,
		// 				  recurring: {
		// 					  ...task.recurring,
		// 					  hasBeenRecurred: true,
		// 				  },
		// 			  }
		// 			: task
		// 	),
		// }));
		
		// console.log("All tasks with `hasBeenRecurred` updated: ", updatedDays);

		// dispatch(
		// 	updateCalendar({
		// 		...selectedCalendar,
		// 		days: updatedDays,
		// 	})
		// );

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
