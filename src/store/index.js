import { configureStore } from '@reduxjs/toolkit';
// import todosSlice from './slices/todosSlice';
// import authReducer from './slices/authSlice';

export default configureStore({
    reducer:{
        // auth: authReducer,
        // todos: todosSlice
    }
})