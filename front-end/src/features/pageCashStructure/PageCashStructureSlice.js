import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
	DEFAULT_ZERO
} from '../../constants/default-values';
import bankList from '../../mocks/mockDataBankList';

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
		disableStarterForm: (state, action) => {
			state.isCategoriesStarterFinished = true;
		},
		saveTotalSumByType: (state, action) => {
			state.totalSums[action.payload.type] = action.payload.total;
		},
		getBankItems: (state, action) => {
			// TODO remove and add real functionality
			if(process.env.NODE_ENV === 'development') {
				state.bankItems = bankList;
			}
		},
		addBankOrganization: {
			reducer: (state, action) => {
				state.bankItems[action.payload._id] = {
					name: action.payload.bankName,
					_id: action.payload._id,
					accounts: []
				};
			},
		},
		removeBankOrganization: (state, action) => {
			delete state.bankItems[action.payload];
		},
		addBankAccount: (state, action) => {
			state.bankItems[action.payload.bankId].accounts.push({ ...action.payload.account, id: uuidv4() });
		},
		removeBankAccount: (state, action) => {
			state.bankItems[action.payload.bankId].accounts = state.bankItems[action.payload.bankId].accounts.filter(account => account.id !== action.payload.accountId);
		},
	}
});

export const {
	getCategories,
	addCashCategoryItem,
	disableStarterForm,
	deleteCashCategoryItem,
	saveTotalSumByType,
	getBankItems,
	removeBankAccount,
	removeBankOrganization,
	addBankOrganization,
	addBankAccount,
} = pageCashStructureSlice.actions;

export default pageCashStructureSlice.reducer;