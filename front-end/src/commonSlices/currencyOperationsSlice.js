import { createSlice, } from '@reduxjs/toolkit';

import { CUR_RUB, CUR_USD, LANG_RU } from '../constants/default-values';

const initialState = {
	baseCurrency: navigator.language.includes(LANG_RU) ? CUR_RUB : CUR_USD
};

export const currencyOperationsSlice = createSlice({
	name: 'currencies',
	initialState,
	reducers: {
		getAllCurrencies: (state, action) => {
			// TODO
		},
		changeBaseCurrency: (state, action) => {
			state.baseCurrency = action.payload;
		}
	}
});

export const { changeBaseCurrency, } = currencyOperationsSlice.actions;
export default currencyOperationsSlice.reducer;
