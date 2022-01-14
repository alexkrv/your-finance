import { configureStore } from '@reduxjs/toolkit';

import themeSwitcher from './features/themeSwitcher/ThemeSwitcherSlice';
import auth from './features/loginPage/LoginPageSlice';

export const store = configureStore({
	reducer: {
		theme: themeSwitcher,
		auth
	},
});