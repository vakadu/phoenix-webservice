import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { themeConfig } from '@webservices/primitives';

const initialState = {
	mobileMenu: false,
	showOtp: false,
	isNewUser: false,
	isCollapsed: themeConfig.dashboardLayout.menu.isCollapsed,
	isRTL: themeConfig.dashboardLayout.isRTL,
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
		handleSidebarCollapsed: (state, action) => {
			state.isCollapsed = action.payload;
			if (typeof window !== 'undefined') {
				window?.localStorage.setItem('sidebarCollapsed', action.payload);
			}
		},
		handleRtl: (state, action) => {
			state.isRTL = action.payload;
			if (typeof window !== 'undefined') {
				window?.localStorage.setItem('direction', JSON.stringify(action.payload));
			}
		},
	},
});

export const { handleMobileMenu, setOtp, setIsNewUser, handleSidebarCollapsed, handleRtl } =
	layoutSlice.actions;

export default layoutSlice.reducer;
