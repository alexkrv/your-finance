import { configureStore } from '@reduxjs/toolkit';
import themeSwitcher from 'features/switchTheme/SwitchThemeSlice';
import auth from 'features/pageLogin/PageLoginSlice';
import cashCategories from 'features/pageCashStructure/PageCashStructureSlice';
import valueVisibility from 'features/switchValueVisibility/SwitchValueVisibilitySlice';
import currencyOperationsSlice from 'commonSlices/currencyOperationsSlice';
import { api, } from 'api/';

export const store = configureStore({
	reducer: {
		theme: themeSwitcher,
		auth,
		cashCategories,
		valueVisibility,
		currencies: currencyOperationsSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware)
});