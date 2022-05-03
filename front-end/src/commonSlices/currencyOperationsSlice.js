import { createSlice, } from '@reduxjs/toolkit';

import { CUR_RUB, CUR_USD, LANG_RU } from '../constants/default-values';

const initialState = {
	baseCurrencyKey: navigator.language.includes(LANG_RU) ? CUR_RUB : CUR_USD,
	currenciesInfo: {
		list: {}
	},
	conversionRates: {}
};

export const currencyOperationsSlice = createSlice({
	name: 'currencies',
	initialState,
	reducers: {
		changeBaseCurrency: (state, action) => {
			state.baseCurrencyKey = action.payload;
		},
		setConversionRates: (state, action) => {
			state.conversionRates = action.payload;
		},
		setCurrenciesInfo: (state, action) => {
			state.currenciesInfo = { ...action.payload };
		}
	}
});

export const { changeBaseCurrency, setConversionRates, setCurrenciesInfo, } = currencyOperationsSlice.actions;
export default currencyOperationsSlice.reducer;
