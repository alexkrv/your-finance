import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING } from '../../constants/default-values';

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
			state.categories.incomes.push({ ...action.payload, type: CATEGORY_TYPE_INCOME, id: uuidv4()/*TODO receive after https request*/ });
		},
		addSpending: (state, action) => {
			state.categories.spending.push({ ...action.payload, type: CATEGORY_TYPE_SPENDING, id: uuidv4() });
		}
	}
});

export const { getCategories, addIncome, addSpending, } = cashCategoriesSlice.actions;

export default cashCategoriesSlice.reducer;