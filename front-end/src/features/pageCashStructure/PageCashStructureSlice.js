import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
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
			// TODO add functionality
		},
		addCashCategory: (state, action) => {
			state.categories[action.payload.type].push(action.payload);
		},
		addSpending: (state, action) => {
			state.categories.spending.push({ ...action.payload, type: CATEGORY_TYPE_SPENDING, id: uuidv4() });
		},
		addFrozen: (state, action) => {
			state.categories.frozen.push({ ...action.payload, type: CATEGORY_TYPE_FROZEN, id: uuidv4() });
		},
		deleteIncome: (state, action) => {
			state.categories.income = state.categories.income.filter(income => income.id !== action.payload);
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
		getBankItems: (state, action) => {
			// TODO remove and add real functionality
			if(process.env.NODE_ENV === 'development') {
				state.bankItems = bankList;
			}
		},
		addBankOrganization: {
			reducer: (state, action) => {
				state.bankItems[action.payload.bankId] = {
					name: action.payload.bankName,
					id: action.payload.bankId,
					accounts: []
				};
			},
			prepare: (bankName) => {
				const bankId = uuidv4();

				return { payload: { bankId, bankName } };
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
	addCashCategory,
	addSpending,
	addFrozen,
	disableStarterForm,
	deleteIncome,
	deleteSpending,
	deleteFrozen,
	saveTotalSumByType,
	getBankItems,
	removeBankAccount,
	removeBankOrganization,
	addBankOrganization,
	addBankAccount,
} = pageCashStructureSlice.actions;

export default pageCashStructureSlice.reducer;