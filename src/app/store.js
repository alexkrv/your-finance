import { configureStore } from '@reduxjs/toolkit';

import themeSwitcher from '../features/themeSwitcher/ThemeSwitcherSlice';

export const store = configureStore({
	reducer: {
		theme: themeSwitcher
	},
});