import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categories: {
		incomes: [],
		spending: [],
	}
};

export const cashCategoriesSlice = createSlice({
	name: 'cashCategories',
	initialState,
	reducers: {
		getCategories: (state, action) => {
			// TODO add functionality
		},
		addIncome: (state, action) => {
			state.categories.incomes.push(action.payload);
		},
		addSpending: (state, action) => {
			state.categories.spending.push(action.payload);
		}
	}
});

export const { getCategories, addIncome, addSpending, } = cashCategoriesSlice.actions;

export default cashCategoriesSlice.reducer;