import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './slices/albumsSlice';
import currentPageReducer from './slices/currentPageSlice';
import authReducer from './slices/authSlice';

export default configureStore({
    reducer: {
        albums: albumsReducer,
        currentPage: currentPageReducer,
        auth: authReducer
    }
})
