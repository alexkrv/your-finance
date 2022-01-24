import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { CATEGORY_TYPE_FROZEN, CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING } from '../../constants/default-values';

const initialState = {
	categories: {
		incomes: [],
		spending: [],
		frozen: [],
	},
	isCategoriesStarterFinished: Boolean(JSON.parse(localStorage.getItem('isCategoriesStarterFinished')))
};

export const pageCashCategoriesSlice = createSlice({
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
		},
		addFrozen: (state, action) => {
			state.categories.frozen.push({ ...action.payload, type: CATEGORY_TYPE_FROZEN, id: uuidv4() });
		},
		disableStarterForm: (state, action) => {
			state.isCategoriesStarterFinished = true;
		},
	}
});

export const { getCategories, addIncome, addSpending, addFrozen, disableStarterForm, } = pageCashCategoriesSlice.actions;

export default pageCashCategoriesSlice.reducer;