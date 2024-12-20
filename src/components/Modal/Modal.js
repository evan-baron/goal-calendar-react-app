import React from 'react';
import './Modal.css';

const Modal = ({
	isOpen,
	onClose,
	onConfirm,
	modalType,
	newCalName,
	setModalType,
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
				return (
					<div className='modal-buttons'>
						<button onClick={onClose}>Ok</button>
					</div>
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
