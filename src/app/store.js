import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';
import newCalendarReducer from '../features/CalendarForm/calendarSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        calendars: newCalendarReducer
    },
})