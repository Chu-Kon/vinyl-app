import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './slices/albumsSlice';
import currentPageReducer from './slices/currentPageSlice';

export default configureStore({
    reducer: {
        albums: albumsReducer,
        currentPage: currentPageReducer
    }
})