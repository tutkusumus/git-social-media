import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postId: "",
};

export const postIdSlice = createSlice({
    name: 'postId',
    initialState,
    reducers: {
        setPostId: (state, action) => {
            state.postId = action.payload;
        },
        clearPostId: (state) => {
            state.postId = "";
        },
    },
});

export const { setPostId, clearPostId } = postIdSlice.actions;

export default postIdSlice.reducer;
