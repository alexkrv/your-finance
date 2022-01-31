import { configureStore } from '@reduxjs/toolkit';

import themeSwitcher from 'features/switchTheme/SwitchThemeSlice';
import auth from 'features/pageLogin/PageLoginSlice';
import cashCategories from 'features/pageCashStructure/PageCashStructureSlice';
import valueVisibility from 'features/switchValueVisibility/SwitchValueVisibilitySlice';
import currencyOperationsSlice from 'commonSlices/currencyOperationsSlice';
import { currencyApi } from 'services/currencyApiSlice';

export const store = configureStore({
	reducer: {
		theme: themeSwitcher,
		auth,
		cashCategories,
		valueVisibility,
		currencies: currencyOperationsSlice,
		[currencyApi.reducerPath]: currencyApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(currencyApi.middleware),
});