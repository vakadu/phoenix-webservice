import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	mobileMenu: false,
	showOtp: false,
	isNewUser: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleMobileMenu: (state, action) => {
			state.mobileMenu = action.payload;
		},
		setOtp: (state, action: PayloadAction<{ showOtp: boolean }>) => {
			state.showOtp = action.payload.showOtp;
		},
		setIsNewUser: (state, action: PayloadAction<{ isNewUser: boolean }>) => {
			state.isNewUser = action.payload.isNewUser;
		},
	},
});

export const { handleMobileMenu, setOtp, setIsNewUser } = layoutSlice.actions;

export default layoutSlice.reducer;
