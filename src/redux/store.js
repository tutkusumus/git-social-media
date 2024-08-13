// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../redux/slices/tagsSlice';

export const store = configureStore({
    reducer: {
        tags: tagsReducer,
    },
});
