/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalTypes } from '@webservices/primitives';

export type MODAL_VIEW = ModalTypes.CONFIRMATION_MODAL | ModalTypes.SIDEBAR_MENU | '';

type ModalState = {
	isOpen: boolean;
	view: MODAL_VIEW;
};

const initialState: ModalState = {
	isOpen: false,
	view: '',
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
