import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectInProgressCalendars } from '../../features/CalendarForm/calendarSlice';
import './Dashboard.css';
import CalendarDisplay from '../../features/CalendarDisplay/CalendarDisplay';

const Dashboard = ({
	isDirty,
	setIsDirty,
	setIsModalOpen,
	isModalOpen,
	setModalType,
	modalType,
	activeIndex,
	editMode,
	setEditMode,
	setNavStatus,
	selectedCalendar,
}) => {
	const selectedInProgCalendar = useSelector(selectInProgressCalendars); //array of in-progress calendars

	useEffect(() => {
		//this re-renders the page if selectedCalendar or activeIndex change
	}, [selectedInProgCalendar, activeIndex]);

	return selectedInProgCalendar.length > 0 &&
		activeIndex >= 0 &&
		selectedInProgCalendar[activeIndex] ? (
		<div className='dashboard-container'>
			<CalendarDisplay
				isDirty={isDirty}
				setIsDirty={setIsDirty}
				editMode={editMode}
				setEditMode={setEditMode}
				setNavStatus={setNavStatus}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				modalType={modalType}
				setModalType={setModalType}
				selectedCalendar={selectedCalendar}
			/>
		</div>
	) : null;
};

export default Dashboard;
