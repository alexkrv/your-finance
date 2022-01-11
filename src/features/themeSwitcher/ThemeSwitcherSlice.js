import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 'light',
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