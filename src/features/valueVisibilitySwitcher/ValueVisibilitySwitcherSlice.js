import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isVisible: false,
};
export const valueVisibilitySwitcherSlice = createSlice({
	name: 'valueVisibility',
	initialState,
	reducers: {
		toggleVisibility: (state, action) => {
			state.isVisible = !state.isVisible;
		}
	}
});

export const { toggleVisibility } = valueVisibilitySwitcherSlice.actions;

export default valueVisibilitySwitcherSlice.reducer;