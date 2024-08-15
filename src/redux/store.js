import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../redux/slices/tagsSlice';
import modalReducer from "../redux/slices/modalSlice";
import postIdReducer from "../redux/slices/postIdSlice";
export const store = configureStore({
    reducer: {
        tags: tagsReducer,
        modal: modalReducer,
        postId: postIdReducer,
    },
});
