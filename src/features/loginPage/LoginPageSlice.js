import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true; // TODO create functionality
		},
		logout: (state, action) => {
			state.isAuthenticated = false; // TODO create functionality
		},
	},
});

export const { login, logout, } = authSlice.actions;

export default authSlice.reducer;