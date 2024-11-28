import React, { useState } from 'react';
import './Controls.css';
import { Edit, Delete, Preview, Save, RocketLaunch } from '@mui/icons-material';

const Controls = ({
	isDirty,
	setIsModalOpen,
	setModalType,
	setNewCalName,
	newCalName,
	setEditMode,
	setEditName,
	setNavStatus,
	selectedCalendar,
	validateDates,
}) => {
	const [previewMode, setPreviewMode] = useState(false);

	return (
		<div className='controls-container'>
			<div
				className='controls-option'
				onClick={() => {
					setEditMode(true);
					setNavStatus(true);
					setPreviewMode(false);
				}}
			>
				<Edit fontSize='large' />
				<div>Edit</div>
			</div>
			{!previewMode ? (
				<>
					<div
						className='controls-option'
						onClick={() => {
							setIsModalOpen(true);
							setModalType('delete-calendar');
						}}
					>
						<Delete fontSize='large' />
						<div>Delete</div>
					</div>
				</>
			) : null}
			<div
				className='controls-option'
				onClick={() => {
					setNewCalName(newCalName);
					setEditName(false);
					setEditMode(false);
					setNavStatus(false);
					setPreviewMode(true);
				}}
			>
				<Preview fontSize='large' />
				<div>Preview</div>
			</div>
			<div
				className='controls-option'
				onClick={isDirty ? () => validateDates() : null}
			>
				<Save fontSize='large' />
				<div>Save</div>
			</div>
			<div
				className='controls-option'
				onClick={() => {
					console.log(selectedCalendar);
				}}
			>
				<RocketLaunch fontSize='large' />
				<div>Launch</div>
			</div>
		</div>
	);
};

export default Controls;
