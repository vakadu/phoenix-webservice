import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileMenu: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        handleMobileMenu: (state, action) => {
            state.mobileMenu = action.payload;
        },
    },
});

export const {
    handleMobileMenu,
} = layoutSlice.actions;

export default layoutSlice.reducer;
