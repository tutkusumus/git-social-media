import { createSlice } from '@reduxjs/toolkit';

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        selectedTags: [],
    },
    reducers: {
        toggleTag: (state, action) => {
            const tag = action.payload;
            if (state.selectedTags.includes(tag)) {
                state.selectedTags = state.selectedTags.filter(t => t !== tag);
            } else {
                state.selectedTags.push(tag);
            }
        },
    },
});

export const { toggleTag } = tagsSlice.actions;
export default tagsSlice.reducer;
