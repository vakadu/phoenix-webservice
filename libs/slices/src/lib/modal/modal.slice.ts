/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalTypes } from '@webservices/primitives';

export type MODAL_VIEW =
	| ModalTypes.CONFIRMATION_MODAL
	| ModalTypes.SIDEBAR_MENU
	| ModalTypes.ADD_EDIT_PARENT
	| ModalTypes.ADD_EDIT_PET
	| '';

type ModalState = {
	isOpen: boolean;
	view: MODAL_VIEW;
	onHandleConfirm?: () => void;
	confirmationTitle?: string;
	confirmationHeading?: string;
	data?: any;
	type?: 'add' | 'edit';
	refetch?: () => void;
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
		confimationModal: (state, action: PayloadAction<Partial<ModalState>>) => {
			state.confirmationTitle = action.payload.confirmationTitle;
			state.onHandleConfirm = action.payload.onHandleConfirm;
			state.confirmationHeading = action.payload.confirmationHeading;
			Object.assign(state, action.payload);
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
