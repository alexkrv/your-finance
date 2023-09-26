import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
	isAuthenticated: boolean
}

const initialState: SliceState = {
	isAuthenticated: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = false
		},
		logout: (state) => {
			state.isAuthenticated = false; // TODO create functionality
		},
	},
});

export const { login, logout, } = authSlice.actions;

export default authSlice.reducer;