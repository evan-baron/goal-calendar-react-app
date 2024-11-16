import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        id: '',
        username: ''
    },
    error: null
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            const { id, username } = action.payload;
            state.isAuthenticated = true; {/* CHANGE THIS WHEN USING ACTUAL AUTHENTICATION TO CHECK IF AUTHENTICATED */}
            state.user = {
                id: id,
                username: username
            }
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = {
                id: '',
                username: ''
            }
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;