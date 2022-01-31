import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisible: JSON.parse(localStorage.getItem('isValueVisible'))
};
export const switchValueVisibilitySlice = createSlice({
	name: 'valueVisibility',
	initialState,
	reducers: {
		toggleVisibility: (state, action) => {
			state.isVisible = !state.isVisible;
		}
	}
});

export const { toggleVisibility } = switchValueVisibilitySlice.actions;

export default switchValueVisibilitySlice.reducer;