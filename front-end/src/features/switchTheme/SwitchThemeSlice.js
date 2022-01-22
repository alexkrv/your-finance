import { createSlice } from '@reduxjs/toolkit';

const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = JSON.parse(localStorage.getItem('theme')) || defaultDark;
const initialState = {
	value: savedTheme,
};

export const switchThemeSlice = createSlice({
	name: 'themeSwitcher',
	initialState,
	reducers: {
		switchTheme: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { switchTheme } = switchThemeSlice.actions;

export default switchThemeSlice.reducer;