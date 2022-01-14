import { createSlice } from '@reduxjs/toolkit';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = JSON.parse(localStorage.getItem('theme')) || defaultDark;
const initialState = {
	value: savedTheme,
};

export const themeSwitcherSlice = createSlice({
	name: 'themeSwitcher',
	initialState,
	reducers: {
		switchTheme: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { switchTheme } = themeSwitcherSlice.actions;

export default themeSwitcherSlice.reducer;