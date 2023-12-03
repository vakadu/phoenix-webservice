/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalTypes } from '@webservices/primitives';

export type MODAL_VIEW = ModalTypes.CONFIRMATION_MODAL | "";

type ModalState = {
    isOpen: boolean;
    view: MODAL_VIEW;
    modalData: any;
    onClick: (...args: any) => void;
    bottomSheet: boolean;
    heading: string;
    subHeading: string;
    btnText: string;
};

const initialState: ModalState = {
    isOpen: false,
    view: '',
    modalData: null,
    onClick: () => null,
    bottomSheet: false,
    heading: 'Remove Item',
    subHeading: 'Are you sure you want to remove this item?',
    btnText: 'Remove',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Partial<ModalState>>) => {
            state.isOpen = true;
            Object.assign(state, action.payload);
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
