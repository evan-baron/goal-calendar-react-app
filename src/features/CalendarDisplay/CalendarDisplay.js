import React, { useState, useEffect } from 'react';
import './CalendarDisplay.css';
import { useDispatch } from 'react-redux';
import { updateCalendar, deleteCalendar } from '../CalendarForm/calendarSlice';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Controls from '../../components/Dashboard/Controls/Controls';
import { Edit, Check, DoNotDisturb } from '@mui/icons-material';
import Modal from '../../components/Modal/Modal';
import TasksModal from '../../components/TasksModal/TasksModal';
import RecurrenceModal from '../../components/RecurrenceModal/RecurrenceModal';
import Calendar from '../../components/Calendar/Calendar';

//CalendarDisplay = the page-within-DashboardPage -> Dashboard that handles the Calendar (title, edit dates, rendered calendar)
const CalendarDisplay = ({
	isDirty,
	setIsDirty,
	isModalOpen,
	setIsModalOpen,
	modalType,
	setModalType,
	editMode,
	setEditMode,
	setNavStatus,
	selectedCalendar,
}) => {
	const { calendarId, calendarName, startDate, endDate, weekends } =
		selectedCalendar;

	//States
	const [originalStart, setOriginalStart] = useState(dayjs(startDate));
	const [newStart, setNewStart] = useState(dayjs(startDate));
	const [originalEnd, setOriginalEnd] = useState(dayjs(endDate));
	const [newEnd, setNewEnd] = useState(dayjs(endDate));
	const [editName, setEditName] = useState(false);
	const [editStart, setEditStart] = useState(false);
	const [editEnd, setEditEnd] = useState(false);
	const [originalCalName, setOriginalCalName] = useState(calendarName);
	const [newCalName, setNewCalName] = useState(calendarName);
	const [toggleWeekends, setToggleWeekends] = useState(weekends);
	const [originalWeekends, setOriginalWeekends] = useState(weekends);
	const [showWeekends, setShowWeekends] = useState(true);
	const [selectedDay, setSelectedDay] = useState(null);
	const [currentTasks, setCurrentTasks] = useState(null);
	const [tasksModalOpen, setTasksModalOpen] = useState(null);
	const [disableDayChecked, setDisableDayChecked] = useState(false);
	const [disabledDays, setDisabledDays] = useState([]);

	const dispatch = useDispatch();

	// makes the current calendar name equal to the active calendar object's calendar name value, updates when page rerenders and dependency array checks if anything has happened to active index or inprog calendars
	useEffect(() => {
		setEditName(false);
		setNewCalName(selectedCalendar?.calendarName);
		setOriginalStart(dayjs(selectedCalendar?.startDate));
		setOriginalEnd(dayjs(selectedCalendar?.endDate));
		setOriginalWeekends(selectedCalendar?.weekends);
	}, [selectedCalendar, toggleWeekends, selectedDay]);

	//turns on preview mode and disables edit mode, on-off switch basically
	const toggleEdit = () => {
		setEditName((prev) => !prev);
		setOriginalCalName(newCalName);
	};

	//changes new start date, stores original start date for comparison purposes
	const changeStartDate = (newValue) => {
		if (!newValue.isSame(newStart)) {
			setNewStart(newValue);
			setEditStart(true);
			setIsDirty(true);
		}
	};

	//changes new end date, stores original end date for comparison purposes
	const changeEndDate = (newValue) => {
		if (!newValue.isSame(newEnd)) {
			setNewEnd(newValue);
			setEditEnd(true);
			setIsDirty(true);
		}
	};

	//logic for including weekends in calendar edit mode, if yes, includes weekends in in-range days, if no, excludes... also assists with hide weekends button functionality
	const handleRadioChange = () => {
		setToggleWeekends((prev) => (prev = !prev));
		setIsDirty(toggleWeekends === originalWeekends);
	};

	//validates the dates selected, multiple rules created and sent to switch board for modal
	const validateDates = () => {
		const start = newStart;
		const end = newEnd;
		const durationInDays = end.diff(start, 'day');

		if (start.isBefore(dayjs(), 'day')) {
			//start date is before current day?
			setModalType('in-the-past');
			setIsModalOpen(true);
			return true;
		} else if (end.isBefore(start) || end.isSame(start)) {
			//end date is before or same as start date?
			setModalType('date-error-end-before');
			setIsModalOpen(true);
			return true;
		} else if (durationInDays < 14) {
			//duration is less than 2 weeks
			setModalType('too-short');
			setIsModalOpen(true);
			return true;
		} else if (durationInDays > 182) {
			//duration is greater than 26 weeks
			setModalType('too-long');
			setIsModalOpen(true);
			return true;
		} else setModalType('save-changes'); //saves changes
		setIsModalOpen(true);
		return false;
	};

	//as it sounds, saves changes
	const saveChanges = () => {
		const start = newStart;
		const end = newEnd;

		const existingTasks = selectedCalendar.tasks || [];

		//creates tasks to dispatch into the master state object for days marked !outside-range
		const tasks = () => {
			//takes end date diff start date and makes blank array to mutate/change, tasksArr = start value (blank array), _ is the item being iterated, no need for a value in this scenario, dayIndex is how it will be organized in the finished tasksArr
			return [...Array(end.diff(start, 'day') + 1)].reduce(
				(tasksArr, _, dayIndex) => {
					const currentDay = start.add(dayIndex, 'day');

					//testing if the day is a weekend
					const isWeekend =
						currentDay.day() === 0 || currentDay.day() === 6;

					//if the user selected exclude weekends and day is weekend, do nothing
					if (!toggleWeekends && isWeekend) {
						return tasksArr;
					}

					const existingTaskForDay = existingTasks.find(
						(task) => task.date === currentDay.format('YYYY-MM-DD')
					);

					//sending blank tasks object to the state object for each day in the date range
					tasksArr.push(
						existingTaskForDay || {
							date: currentDay.format('YYYY-MM-DD'),
							tasks: {
								daily: [],
								bonus: [],
							},
						}
					);

					return tasksArr;
				},
				[] //the starting array for the reduce method
			);
		};

		//if validateDates comes back false (as in the tests all passed), dispatch the edits/update the calendar object
		if (!validateDates()) {
			const editedCalendar = {
				calendarId: calendarId,
				calendarName: newCalName,
				startDate: start.toISOString(),
				endDate: end.toISOString(),
				weekends: toggleWeekends,
				tasks: tasks(), //BIG PROBLEM - EVERYTIME VALIDATEDATES EXECUTES, IT CLEARS TASKS
			};

			dispatch(updateCalendar(editedCalendar));

			setIsModalOpen(false);
			setIsDirty(false);
			setModalType(null);
		}
		return;
	};

	//function for when user clicks away after making edits to the calendar, uses switch for modal
	const acceptChanges = () => {
		switch (modalType) {
			case 'discard-changes':
				setNewCalName(calendarName);
				setNewStart(dayjs(startDate));
				setNewEnd(dayjs(endDate));
				setIsDirty(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'delete-calendar':
				dispatch(deleteCalendar(calendarId));
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'change-name':
				setIsModalOpen(false);
				setModalType(null);
				setEditName(false);
				break;
			case 'change-start':
				setEditStart(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'change-end':
				setEditEnd(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'save-changes':
				saveChanges();
				break;
			case 'change-calendars':
				saveChanges();
				break;
			case 'disable-day':
				const hasTasks = !!selectedDay.tasks.daily.length > 0;
				if (hasTasks && !disableDayChecked) {
					setModalType('disable-day-with-tasks');
				} else {
					if (disableDayChecked) {
						const targetDay = dayjs(selectedDay.date).day();
						const matchingDays = [];

						let current = newStart;

						while (
							current.isBefore(newEnd, 'day') ||
							current.isSame(newEnd, 'day')
						) {
							if (current.day() === targetDay) {
								matchingDays.push(current.format('YYYY-MM-DD'));
							}

							current = current.add(1, 'day');
						}

						const matchingDaysInRange =
							selectedCalendar.tasks.filter((task) => {
								return matchingDays.some(
									(day) => task.date === day
								);
							});
						const matchingDaysInRangeMinusDay =
							matchingDaysInRange.filter(
								(day) => day.date !== selectedDay.date
							);
						const matchingDaysHasTasks =
							!!matchingDaysInRangeMinusDay.some(
								(day) => day.tasks.daily.length > 0
							);

						if (matchingDaysHasTasks) {
							setModalType('matching-days-have-tasks');
							setIsModalOpen(true);
						} else {
							setDisabledDays((prev) =>
								Array.from(new Set([...prev, ...matchingDays]))
							);
							setDisableDayChecked(false);
							setIsModalOpen(false);
							setModalType(null);
						}
					} else {
						setDisabledDays([...disabledDays, selectedDay.date]);
						setIsModalOpen(false);
						setModalType(null);
					}
				}
				break;
			case 'disable-day-with-tasks':
				setDisabledDays([...disabledDays, selectedDay.date]);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'matching-days-have-tasks':
				const targetDay = dayjs(selectedDay.date).day();
				const matchingDays = [];

				let current = newStart;

				while (
					current.isBefore(newEnd, 'day') ||
					current.isSame(newEnd, 'day')
				) {
					if (current.day() === targetDay) {
						matchingDays.push(current.format('YYYY-MM-DD'));
					}

					current = current.add(1, 'day');
				}
				setDisabledDays((prev) =>
					Array.from(new Set([...prev, ...matchingDays]))
				);
				setDisableDayChecked(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'enable-day':
				if (disableDayChecked) {
					const targetDay = dayjs(selectedDay.date).day();

					setDisabledDays(
						disabledDays.filter(
							(day) =>
								dayjs(day).day() !==
								dayjs(selectedDay.date).day()
						)
					);

					setIsModalOpen(false);
					setModalType(null);
					setDisableDayChecked(false);
					break;
				} else {
					setDisabledDays(
						disabledDays.filter((day) => day !== selectedDay.date)
					);
					setIsModalOpen(false);
					setModalType(null);
					setDisableDayChecked(false);
				}
				break;
			default:
				console.log('Unhandled modalType:', modalType);
				break;
		}
	};

	//logic for handling cancelation of changes
	const rejectChanges = () => {
		switch (modalType) {
			case 'delete-calendar':
			case 'change-calendars':
			case 'discard-changes':
			case 'date-error-end-before':
			case 'too-short':
			case 'too-long':
			case 'in-the-past':
			case 'save-changes':
			case 'too-many-calendars':
			case 'disable-day':
			case 'disable-day-with-tasks':
			case 'enable-day':
			case 'matching-days-have-tasks':
			case 'task-end-before-start':
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'change-name':
				setNewCalName(originalCalName);
				setIsModalOpen(false);
				setEditName(false);
				break;
			case 'change-start':
				setNewStart(originalStart);
				setEditStart(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			case 'change-end':
				setNewEnd(originalEnd);
				setEditEnd(false);
				setIsModalOpen(false);
				setModalType(null);
				break;
			default:
				break;
		}
	};

	return (
		<div className='calendar-main'>
			<div className='calendar-container'>
				<div
					className={
						editMode && !editName
							? 'calendar-title edit-mode'
							: 'calendar-title'
					}
				>
					{editName ? (
						<>
							<input
								className='edit-name-input'
								value={newCalName}
								onChange={(e) => {
									setIsDirty(true);
									setNewCalName(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										if (newCalName !== originalCalName) {
											setIsModalOpen(true);
											setModalType('change-name');
										}
									}
								}}
							/>
							<Check
								className='check-icon'
								onClick={() => {
									if (newCalName !== originalCalName) {
										setIsModalOpen(true);
										setModalType('change-name');
									}
								}}
								sx={{ fontSize: 50 }}
							/>
							<DoNotDisturb
								className='cancel-icon'
								onClick={() => {
									setEditName(false);
									setNewCalName(originalCalName);
								}}
								sx={{ fontSize: 40 }}
							/>
						</>
					) : (
						<div
							className='calendar-name'
							onClick={editMode ? toggleEdit : null}
						>
							{newCalName}
						</div>
					)}
					{editMode && !editName ? (
						<Edit className='title-pencil' sx={{ fontSize: 40 }} />
					) : null}
				</div>
				{editMode ? (
					<>
						<div className='edit-dates'>
							<div className='calendar-select'>
								<div className='new-label'>Start Date:</div>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DesktopDatePicker
										value={dayjs(startDate)}
										onChange={changeStartDate}
										required
										slotProps={{
											textField: {
												sx: {
													'& .MuiInputBase-root': {
														height: '1.75rem',
														width: '8rem',
														padding: '.25rem',
														margin: '0',
														background: 'white',
													},
													'& .MuiInputBase-input': {
														color: 'rgb(25, 25, 75)',
														padding: '0',
													},
												},
											},
										}}
									/>
								</LocalizationProvider>
								{/* UNCOMMENT BELOW IF YOU WANT CHECK AND CANCEL ICONS */}
								{/* {editStart ? (
									<div className='date-confirm'>
										<Check
											className='date-check'
											onClick={() => {
												setIsModalOpen(true);
												setModalType('change-start');
											}}
										/>
										<DoNotDisturb
											className='date-cancel'
											onClick={() => {
												setNewStart(originalStart);
												setEditStart(false);
											}}
										/>
									</div>
								) : null} */}
							</div>
							<div className='calendar-select'>
								<div className='new-label'>End Date:</div>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<DesktopDatePicker
										value={dayjs(endDate)}
										onChange={changeEndDate}
										required
										slotProps={{
											textField: {
												sx: {
													'& .MuiInputBase-root': {
														height: '1.75rem',
														width: '8rem',
														padding: '.25rem',
														margin: '0',
														background: 'white',
													},
													'& .MuiInputBase-input': {
														color: 'rgb(25, 25, 75)',
														padding: '0',
													},
												},
											},
										}}
									/>
								</LocalizationProvider>
								{/* UNCOMMENT BELOW IF YOU WANT CHECK AND CANCEL ICONS */}
								{/* {editEnd ? (
									<div className='date-confirm'>
										<Check
											className='date-check'
											onClick={() => {
												setIsModalOpen(true);
												setModalType('change-end');
											}}
										/>
										<DoNotDisturb
											className='date-cancel'
											onClick={() => {
												setEditEnd(false);
												setNewEnd(originalEnd);
											}}
										/>
									</div>
								) : null} */}
							</div>
						</div>
						<div className='weekend-prompt-container'>
							{/* include/exclude weekends options with hide/show button */}
							{!toggleWeekends ? (
								<legend>
									Change to{' '}
									<span className='include-exclude'>
										include
									</span>{' '}
									weekends?
								</legend>
							) : (
								<legend>
									Change to{' '}
									<span className='include-exclude'>
										exclude
									</span>{' '}
									weekends?
								</legend>
							)}
							<label>
								Yes
								<input
									type='radio'
									name='weekends'
									value='true'
									checked={toggleWeekends === true}
									onChange={handleRadioChange}
								/>
							</label>
							<label>
								No
								<input
									type='radio'
									name='weekends'
									value='false'
									checked={toggleWeekends === false}
									onChange={handleRadioChange}
								/>
							</label>
							{!toggleWeekends && (
								<button
									onClick={() =>
										setShowWeekends(
											(prev) => (prev = !prev)
										)
									}
								>
									{!showWeekends
										? 'Show Weekends'
										: 'Hide Weekends'}
								</button>
							)}
						</div>
					</>
				) : (
					<button
						className='weekends-button'
						onClick={() =>
							setShowWeekends((prev) => (prev = !prev))
						}
					>
						{!showWeekends ? 'Show Weekends' : 'Hide Weekends'}
					</button>
				)}

				{/* This is the rendered calendar component, all props passed are necessary */}
				<Calendar
					editMode={editMode}
					selectedCalendar={selectedCalendar}
					newStart={newStart}
					newEnd={newEnd}
					toggleWeekends={toggleWeekends}
					showWeekends={showWeekends}
					isDirty={isDirty}
					validateDates={validateDates}
					setSelectedDay={setSelectedDay}
					setTasksModalOpen={setTasksModalOpen}
					setIsModalOpen={setIsModalOpen}
					setModalType={setModalType}
					setCurrentTasks={setCurrentTasks}
					currentTasks={currentTasks}
					disabledDays={disabledDays}
				/>

				{/* the floating control panel for the user */}
				<Controls
					isDirty={isDirty}
					setNewCalName={setNewCalName}
					newCalName={newCalName}
					setEditName={setEditName}
					setEditMode={setEditMode}
					setNavStatus={setNavStatus}
					selectedCalendar={selectedCalendar}
					setIsModalOpen={setIsModalOpen}
					setModalType={setModalType}
					validateDates={validateDates}
				/>
			</div>

			{/* if !editMode, show the due tasks and current stats for the calendar (zero stats as not active) */}
			{!editMode ? (
				<div className='dashboard-calendar-support'>
					<div className='support-container dashboard-tasks'>
						Current Day Tasks
					</div>
					<div className='support-container dashboard-stats'>
						Calendar Stats
					</div>
				</div>
			) : null}

			{/* Modal specific to this page, isOpen, onClose, onConfirm all use functions from this page */}
			<Modal
				isOpen={isModalOpen}
				onClose={rejectChanges}
				onConfirm={acceptChanges}
				modalType={modalType}
				setModalType={setModalType}
				newCalName={newCalName}
				selectedDay={selectedDay}
				disableDayChecked={disableDayChecked}
				setDisableDayChecked={setDisableDayChecked}
				disabledDays={disabledDays}
				newStart={newStart}
				newEnd={newEnd}
			/>
			<TasksModal
				isDirty={isDirty}
				setIsDirty={setIsDirty}
				isOpen={tasksModalOpen}
				selectedCalendar={selectedCalendar}
				selectedDay={selectedDay}
				setTasksModalOpen={setTasksModalOpen}
				setModalType={setModalType}
				setIsModalOpen={setIsModalOpen}
				editMode={editMode}
				currentTasks={currentTasks}
			/>
		</div>
	);
};

export default CalendarDisplay;
