import React from 'react';
import { Switch, } from 'antd';
import { useDispatch, } from 'react-redux';
import useLocalStorage from 'use-local-storage';

import { TEST_ID_THEME_SWITCHER } from '../../constants/test-ids';

import styles from './SwitchTheme.module.scss';

import { switchTheme } from './SwitchThemeSlice';

const light = <svg style={{ width: '12px', height: '12px', fill: 'yellow' }} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	<path d="M3.828 5.243L2.343 3.757a1 1 0 011.414-1.414l1.486 1.485a5.027 5.027 0 00-1.415 1.415zM7 3.1V1a1 1 0 112 0v2.1a5.023 5.023 0 00-2 0zm3.757.728l1.486-1.485a1 1 0 111.414 1.414l-1.485 1.486a5.027 5.027 0 00-1.415-1.415zM12.9 7H15a1 1 0 010 2h-2.1a5.023 5.023 0 000-2zm-.728 3.757l1.485 1.486a1 1 0 11-1.414 1.414l-1.486-1.485a5.027 5.027 0 001.415-1.415zM9 12.9V15a1 1 0 01-2 0v-2.1a5.023 5.023 0 002 0zm-3.757-.728l-1.486 1.485a1 1 0 01-1.414-1.414l1.485-1.486a5.027 5.027 0 001.415 1.415zM3.1 9H1a1 1 0 110-2h2.1a5.023 5.023 0 000 2zM8 11a3 3 0 110-6 3 3 0 010 6z"
		fillRule="evenodd"/>
</svg>; // TODO move to icons

const dark = <svg style={{ width: '12px', height: '12px', fill: 'yellow' }} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M7.914 0a6.874 6.874 0 00-1.26 3.972c0 3.875 3.213 7.017 7.178 7.017.943 0 1.843-.178 2.668-.5C15.423 13.688 12.34 16 8.704 16 4.174 16 .5 12.41.5 7.982.5 3.814 3.754.389 7.914 0z"
		fillRule="evenodd"/>
</svg>; // TODO move to icons

const SwitchTheme = () => {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
	const dispatch = useDispatch();
	const switchThemeMode = () => {
		const newThemeMode = theme === 'light' ? 'dark' : 'light';

		setTheme(newThemeMode);
		dispatch(switchTheme(newThemeMode));
	};

	return (
		<Switch
			checkedChildren={dark}
			unCheckedChildren={light}
			onChange={switchThemeMode}
			defaultChecked={theme === 'light'}
			className={styles.switcher}
			data-testid={TEST_ID_THEME_SWITCHER}
		/>
	);
};

export default SwitchTheme;