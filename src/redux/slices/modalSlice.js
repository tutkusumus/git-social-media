import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalState: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.modalState = true;
        },
        closeModal: (state) => {
            state.modalState = false;
        },
        toggleModal: (state) => {
            state.modalState = !state.modalState;
        }
    }
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
