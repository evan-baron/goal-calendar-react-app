import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
    },
})