import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';
import newCalendarReducer from '../features/NewCalendar/calendarSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        calendars: newCalendarReducer
    },
})