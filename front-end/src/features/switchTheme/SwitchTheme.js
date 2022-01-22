import React from 'react';
import { useTranslation, } from 'react-i18next';
import { Switch, } from 'antd';
import { useDispatch, } from 'react-redux';
import useLocalStorage from 'use-local-storage';

import styles from './SwitchTheme.module.scss';

import { switchTheme } from './SwitchThemeSlice';

const SwitchTheme = () => {
	const { t, } = useTranslation();
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
	const dispatch = useDispatch();
	const switchThemeMode = () => {
		const newThemeMode = theme === 'light' ? 'dark' : 'light';

		setTheme(newThemeMode);
		dispatch(switchTheme(newThemeMode));
	};

	return (
		<div className={styles.container}>
			{t('header.darkTheme')}
			<Switch onChange={switchThemeMode} defaultChecked={theme === 'light'} className={styles.switcher}/>
			{t('header.lightTheme')}
		</div>
	);
};

export default SwitchTheme;