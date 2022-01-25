import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from '../../constants/default-values';

const initialState = {
	categories: {
		incomes: [],// TODO create Map, not Array
		spending: [],
		frozen: [],
	},
	isCategoriesStarterFinished: Boolean(JSON.parse(localStorage.getItem('isCategoriesStarterFinished'))),
	totalSums: {
		income: DEFAULT_ZERO,
		spending: DEFAULT_ZERO,
		frozen: DEFAULT_ZERO,
	}
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
		deleteIncome: (state, action) => {
			state.categories.incomes = state.categories.incomes.filter(income => income.id !== action.payload);
		},
		deleteSpending: (state, action) => {
			state.categories.spending = state.categories.spending.filter(income => income.id !== action.payload);
		},
		deleteFrozen: (state, action) => {
			state.categories.frozen = state.categories.frozen.filter(income => income.id !== action.payload);
		},
		disableStarterForm: (state, action) => {
			state.isCategoriesStarterFinished = true;
		},
		saveTotalSumByType: (state, action) => {
			state.totalSums[action.payload.type] = action.payload.total;
		},
	}
});

export const {
	getCategories,
	addIncome,
	addSpending,
	addFrozen,
	disableStarterForm,
	deleteIncome,
	deleteSpending,
	deleteFrozen,
	saveTotalSumByType,
} = pageCashCategoriesSlice.actions;

export default pageCashCategoriesSlice.reducer;