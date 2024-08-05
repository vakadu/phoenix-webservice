import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
	message: string;
	open: boolean;
	duration: number;
	showCloseButton: boolean;
	actionButton?: () => void;
	btnText?: string;
}

const initialState: SnackbarState = {
	message: '',
	open: false,
	duration: 3000,
	showCloseButton: true,
};

export const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		showSnackbar: (
			state,
			action: PayloadAction<Partial<SnackbarState> & { message: string }>
		) => {
			const { message, duration, showCloseButton, actionButton, btnText } = action.payload;
			state.open = true;
			state.message = message;
			state.duration = duration ?? state.duration;
			state.showCloseButton = showCloseButton ?? state.showCloseButton;
			state.actionButton = actionButton ?? state.actionButton;
			state.btnText = btnText ?? state.btnText;
		},
		closeSnackbar: (state) => {
			state.open = false;
		},
	},
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
