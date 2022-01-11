import React from 'react';
import { useTranslation, } from 'react-i18next';
import { Switch, } from 'antd';
import { useDispatch, useSelector, } from 'react-redux';

import { switchTheme } from './ThemeSwitcherSlice';

const ThemeSwitcher = () => {
	const { t, } = useTranslation();
	const dispatch = useDispatch();
	const theme = useSelector( state => state.theme.value);
	const switchThemeMode = () => dispatch(switchTheme(theme === 'light' ? 'dark' : 'light'));

	return (
		<div>
			{t('header.darkTheme')}
			<Switch onChange={switchThemeMode} defaultChecked={theme === 'light'}/>
			{t('header.lightTheme')}
		</div>
	);
};

export default ThemeSwitcher;