import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {/*TODO*/},
	},
});

export const { login } = authSlice.actions;

export default authSlice.reducer;