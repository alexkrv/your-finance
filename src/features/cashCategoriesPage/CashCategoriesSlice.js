import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categories: []
};

export const cashCategoriesSlice = createSlice({
	name: 'cashCategories',
	initialState,
	reducers: {
		getCategories: (action, payload) => {
			// TODO add functionality
		},
		addCategory: (action, payload) => {
			// TODO add functionality
		}
	}

});

export const { getCategories, addCategory } = cashCategoriesSlice.actions;

export default cashCategoriesSlice.reducer;