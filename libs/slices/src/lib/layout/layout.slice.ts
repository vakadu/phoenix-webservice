import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { themeConfig } from '@webservices/primitives';

const initialState = {
	mobileMenu: false,
	showOtp: false,
	isNewUser: false,
	isCollapsed: themeConfig.dashboardLayout.menu.isCollapsed,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleMobileMenu: (state, action) => {
			state.mobileMenu = action.payload;
		},
		handleSidebarCollapsed: (state, action) => {
			state.isCollapsed = action.payload;
			if (typeof window !== 'undefined') {
				window?.localStorage.setItem('sidebarCollapsed', action.payload);
			}
		},
		setOtp: (state, action: PayloadAction<{ showOtp: boolean }>) => {
			state.showOtp = action.payload.showOtp;
		},
		setIsNewUser: (state, action: PayloadAction<{ isNewUser: boolean }>) => {
			state.isNewUser = action.payload.isNewUser;
		},
	},
});

export const { handleMobileMenu, setOtp, setIsNewUser, handleSidebarCollapsed } =
	layoutSlice.actions;

export default layoutSlice.reducer;
