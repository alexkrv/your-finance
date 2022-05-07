import { createSlice } from '@reduxjs/toolkit';

import {
	DEFAULT_ZERO
} from '../../constants/default-values';

const initialState = {
	categories: {
		income: [],
		spending: [],
		frozen: [],
	},
	isCategoriesStarterFinished: Boolean(JSON.parse(localStorage.getItem('isCategoriesStarterFinished'))),
	totalSums: {
		income: DEFAULT_ZERO,
		spending: DEFAULT_ZERO,
		frozen: DEFAULT_ZERO,
	},
	bankItems: {}
};

export const pageCashStructureSlice = createSlice({
	name: 'cashCategories',
	initialState,
	reducers: {
		getCategories: (state, action) => {
			state.categories = { ...state.categories, ...action.payload };
		},
		addCashCategoryItem: (state, action) => {
			state.categories[action.payload.type].push(action.payload);
		},
		deleteCashCategoryItem: (state, action) => {
			state.categories[action.payload.type] = state.categories[action.payload.type].filter(item => item._id !== action.payload._id);
		},
		disableStarterForm: (state) => {
			state.isCategoriesStarterFinished = true;
		},
		saveTotalSumByType: (state, action) => {
			state.totalSums[action.payload.type] = action.payload.total;
		},
	}
});

export const {
	getCategories,
	addCashCategoryItem,
	disableStarterForm,
	deleteCashCategoryItem,
	saveTotalSumByType,
} = pageCashStructureSlice.actions;

export default pageCashStructureSlice.reducer;