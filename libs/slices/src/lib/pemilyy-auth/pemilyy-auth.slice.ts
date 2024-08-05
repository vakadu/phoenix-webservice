import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {};

const initialState: AuthState = {};

const modalSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
});

export const {} = modalSlice.actions;

export default modalSlice.reducer;
