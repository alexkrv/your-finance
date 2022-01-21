import { configureStore } from '@reduxjs/toolkit';

import themeSwitcher from './features/themeSwitcher/ThemeSwitcherSlice';
import auth from './features/loginPage/LoginPageSlice';
import cashCategories from './features/cashCategoriesPage/CashCategoriesSlice';
import valueVisibility from './features/valueVisibilitySwitcher/ValueVisibilitySwitcherSlice';

export const store = configureStore({
	reducer: {
		theme: themeSwitcher,
		auth,
		cashCategories,
		valueVisibility,
	},
});