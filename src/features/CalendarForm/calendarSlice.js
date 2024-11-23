import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inProgressCalendars: [],
    activeCalendars: [],
    inactiveCalendars: []
}

export const newCalendarSlice = createSlice({
    name: 'calendars',
    initialState: initialState,
    reducers: {
        createCalendar: (state, action) => {
            const { calendarId, calendarName, startDate, endDate } = action.payload;
            const newCalendar = {
                calendarId: calendarId,
                inProgress: true,
                isActive: false,
                calendarName: calendarName,
                startDate: startDate,
                endDate: endDate,
                reward: '',
                totalPointsPossible: 0,
                tasks: {
                    date: {
                        tasks: {
                            task1: '',
                            task2: '',
                            task3: ''
                        },
                        bonus: {
                            bonus1: '',
                            bonus2: '',
                            bonus3: ''
                        },
                        completed: false,
                        pointsPossible: 0,
                        pointsAwarded: 0
                    }
                },
                loaded: true,
                isLoading: false,
                error: false
            };

            state.inProgressCalendars.push(newCalendar);
        },
        updateCalendar: (state, action) => {
            const { calendarId, calendarName, startDate, endDate } = action.payload;
            const calendarIndex = state.inProgressCalendars.findIndex(calendar => calendar.calendarId === calendarId);
            
            if (calendarIndex !== -1) {
                state.inProgressCalendars[calendarIndex].calendarName = calendarName;
                state.inProgressCalendars[calendarIndex].startDate = startDate;
                state.inProgressCalendars[calendarIndex].endDate = endDate;
            } else {
                console.warn(`Calendar with ID ${calendarId} not found.`);
            }
        },
        setActiveCalendar: (state, action) => {
            const calendarId = action.payload;

            const calendarIndex = state.inProgressCalendars.findIndex(c => c.calendarId === calendarId);

            if (calendarIndex !== -1) {
                const calendar = state.inProgressCalendars.splice(calendarIndex, 1)[0];
                delete state.inProgressCalendars[calendarId];
                calendar.inProgress = false;
                calendar.isActive = true;
                state.activeCalendars.push(calendar);
            }
        },
        setInactiveCalendar: (state, action) => {
            const calendarId = action.payload;

            const calendarIndex = state.activeCalendars.findIndex(c => c.calendarId === calendarId);
            
            if (calendarIndex !== -1) {
                const calendar = state.activeCalendars.splice(calendarIndex, 1)[0];
                calendar.isActive = false;
                state.inactiveCalendars.push(calendar);
            }
        },
        deleteCalendar: (state, action) => {
            const calendarId = action.payload;

            state.inProgressCalendars = state.inProgressCalendars.filter(c => c.calendarId !== calendarId);
            state.activeCalendars = state.activeCalendars.filter(c => c.calendarId !== calendarId);
            state.inactiveCalendars = state.inactiveCalendars.filter(c => c.calendarId !== calendarId);
        }
    }
})

export const selectInProgressCalendars = (state) => state.calendars.inProgressCalendars;
export const selectActiveCalendars = (state) => state.calendars.activeCalendars;
export const selectInactiveCalendars = (state) => state.calendars.inactiveCalendars;
export const selectCalendarById = (calendarId) => (state) => {
    return (
        state.calendars.inProgressCalendars.find(calendar => calendar.calendarId === calendarId)
        || state.calendars.activeCalendars.find(calendar => calendar.calendarId === calendarId)
        || state.calendars.inactiveCalendars.find(calendar => calendar.calendarId === calendarId)
    );
};
export const { createCalendar, updateCalendar, setActiveCalendar, setInactiveCalendar, deleteCalendar } = newCalendarSlice.actions;
export default newCalendarSlice.reducer;