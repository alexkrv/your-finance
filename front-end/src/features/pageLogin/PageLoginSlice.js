import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true; // TODO create functionality
		},
		logout: (state) => {
			state.isAuthenticated = false; // TODO create functionality
		},
	},
});

export const { login, logout, } = authSlice.actions;

export default authSlice.reducer;