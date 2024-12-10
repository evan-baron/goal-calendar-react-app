import React from 'react';
import './Modal.css';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const Modal = ({
	isOpen,
	onClose,
	onConfirm,
	modalType,
	newCalName,
	setModalType,
	selectedDay,
	disableDayChecked,
	setDisableDayChecked,
	disabledDays,
	newStart,
	newEnd
}) => {
	if (!isOpen) return null;

	let message = '';

	switch (modalType) {
		case 'reset-calendar':
			message =
				'Are you sure you would like to reset all of your changes?';
			break;
		case 'delete-calendar':
			message = 'Are you sure you want to delete the calendar?';
			break;
		case 'change-calendars':
			message = 'You must save your changes before changing calendars.';
			break;
		case 'discard-changes':
			message = 'Are you sure you want to discard all your changes?';
			break;
		case 'save-changes':
			message = 'Save all changes?';
			break;
		case 'date-error-end-before':
			message = "Your calendar's end date must be after it's start date.";
			break;
		case 'too-short':
			message = 'Your calendar may not be shorter than 2 weeks!';
			break;
		case 'in-the-past':
			message = 'You cannot start your calendar in the past.';
			break;
		case 'too-long':
			message = 'Your calendar may not exceed 26 weeks long!';
			break;
		case 'too-many-calendars':
			message =
				"You may not have more than 5 active projects at once. Please discard one if you'd like to create another.";
			break;
		case 'change-name':
			message = `Change calendar name to ${newCalName}?`;
			break;
		case 'disable-day':
			message = `Disable ${dayjs(selectedDay.date).format('dddd')} the ${dayjs(selectedDay.date).format('Do')}?`
			break;
		case 'disable-day-with-tasks':
			message = (
				<>
					There are tasks currently assigned to this day.<br />Proceed anyway?
				</>
				)
			break;
		case 'matching-days-have-tasks':
			message = (
				<>
					There are tasks currently assigned on other {dayjs(selectedDay.date).format('dddd')}s.<br />Proceed anyway?
				</>
				)
			break;		
		case 'enable-day':
			message = `Re-enable ${dayjs(selectedDay.date).format('dddd')} the ${dayjs(selectedDay.date).format('Do')}?`
			break;
		case 'tasks-empty':
			message = 'One or more of your tasks is empty.'
			break;
		default:
			message = 'Confirm changes?';
	}

	const renderModalContent = () => {
		switch (modalType) {
			case 'change-calendars':
				return (
					<div className='modal-buttons-change-calendars'>
						<div className='change-buttons'>
							<button onClick={onConfirm}>Save</button>
							<button
								onClick={() => {
									setModalType('discard-changes');
								}}
							>
								Discard
							</button>
						</div>
						<button
							className='modal-cancel-button'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				);

			case 'date-error-end-before':
			case 'too-short':
			case 'too-long':
			case 'in-the-past':
			case 'too-many-calendars':
			case 'tasks-empty':
				return (
					<div className='modal-buttons'>
						<button onClick={onClose}>Ok</button>
					</div>
				);

			case 'disable-day':
				const allDaysInRange = [];
				let currentDay = newStart;
				while (currentDay.isBefore(newEnd.add(1, 'day'), 'day')) {
					allDaysInRange.push(currentDay.format('YYYY-MM-DD'));
					currentDay = currentDay.add(1, 'day');
				}
				const allMatchingDays = allDaysInRange.filter((day) => dayjs(day).day() === dayjs(selectedDay.date).day());
				const allDisabledMatchingDays = disabledDays.filter((day) => dayjs(day).day() === dayjs(selectedDay.date).day());


				return (
					<>
						{allDisabledMatchingDays.length !== allMatchingDays.length - 1 ? (<label className='disable-label'>{`Disable all ${dayjs(selectedDay.date).format('dddd')}s?`}
							<input type='checkbox' checked={disableDayChecked} onChange={() => setDisableDayChecked(prev => prev = !prev)} />
						</label>) : null}
						<div className='modal-buttons'>
							<button onClick={onConfirm}>Yes</button>
							<button onClick={onClose}>Nevermind</button>
						</div>
					</>
				)

			case 'enable-day':
				return (
					<>
						{disabledDays.filter(day => dayjs(day).day() === dayjs(selectedDay.date).day()).length > 1 ? (<label className='disable-label'>{`Re-enable all ${dayjs(selectedDay.date).format('dddd')}s?`}
							<input type='checkbox' checked={disableDayChecked} onChange={() => setDisableDayChecked(prev => prev = !prev)} />
						</label>) : null}
						<div className='modal-buttons'>
							<button onClick={onConfirm}>Yes</button>
							<button onClick={onClose}>Nevermind</button>
						</div>
					</>
				);

			default:
				return (
					<div className='modal-buttons'>
						<button onClick={onConfirm}>Yes</button>
						<button onClick={onClose}>Nevermind</button>
					</div>
				);
		}
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<p>{message}</p>
				{renderModalContent()}
			</div>
		</div>
	);
};

export default Modal;
