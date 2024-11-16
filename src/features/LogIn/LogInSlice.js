import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: {
        id: '',
        username: ''
    },
    error: null
}

