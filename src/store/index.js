import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from './slices/albumsSlice';
import currentPageReducer from './slices/currentPageSlice';
import wishlistReducer from './slices/albumsSlice';
import collectionReducer from './slices/albumsSlice';
import authReducer from './slices/authSlice';

export default configureStore({
    reducer: {
        albums: albumsReducer,
        wishlist: wishlistReducer,
        collection: collectionReducer,
        currentPage: currentPageReducer,
        auth: authReducer
    }
})
