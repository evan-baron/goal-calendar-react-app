import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import { useSelector } from "react-redux";
import {
  selectInProgressCalendars,
  selectCalendarById,
} from "../../features/CalendarForm/calendarSlice";
import Toolbar from "../../components/Toolbar/Toolbar";
import Dashboard from "../../components/Dashboard/Dashboard";

const DashboardPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [navStatus, setNavStatus] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const inProgressCalendars = useSelector(selectInProgressCalendars);

  const [prevLength, setPrevLength] = useState(0);

  useEffect(() => {
    const calendarsLength = inProgressCalendars.length;
    if (calendarsLength > prevLength) {
      const newIndex = calendarsLength - 1;
      setActiveIndex(newIndex);
      setSelectedCalendar(inProgressCalendars[newIndex]);
    } else if (calendarsLength < prevLength) {
      setActiveIndex(null);
      setSelectedCalendar(null);
    }
    setPrevLength(calendarsLength);
  }, [inProgressCalendars, prevLength, setActiveIndex, setSelectedCalendar]);

  const calendarId = selectedCalendar?.calendarId;
  const newCalendar = useSelector(selectCalendarById(calendarId));

  useEffect(() => {
    if (newCalendar) {
      setSelectedCalendar(newCalendar);
    }
  }, [newCalendar]);

  return (
    <main className="dashboard-main">
      <div className="dashboard-page-container">
        <Toolbar
          activeIndex={activeIndex}
          isDirty={isDirty}
          navStatus={navStatus}
          setActiveIndex={setActiveIndex}
          setEditMode={setEditMode}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          isModalOpen={isModalOpen}
          modalType={modalType}
          setNavStatus={setNavStatus}
          setSelectedCalendar={setSelectedCalendar}
          inProgressCalendars={inProgressCalendars}
        />
        <Dashboard
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          editMode={editMode}
          setEditMode={setEditMode}
          selectedCalendar={selectedCalendar}
          setSelectedCalendar={setSelectedCalendar}
          activeIndex={activeIndex}
          setNavStatus={setNavStatus}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          setModalType={setModalType}
        />
      </div>
    </main>
  );
};

export default DashboardPage;