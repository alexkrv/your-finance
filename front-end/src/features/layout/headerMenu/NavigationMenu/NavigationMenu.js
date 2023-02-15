import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTE_CASH_CATEGORIES, ROUTE_HOME, ROUTE_INVESTMENTS, ROUTE_STATISTICS } from '../../../../constants/routes';

import styles from './NavigationMenu.module.scss';

import MenuItem from './MenuItem/MenuItem';

const NavigationMenu = () => {
	const { t, } = useTranslation();

	return (
		<nav className={styles.navigationMenu}>
			<MenuItem navigateTo={ROUTE_HOME}>
				{t('header.home')}
			</MenuItem>
			<MenuItem
				navigateTo={ROUTE_CASH_CATEGORIES}
				className={styles.menuLink}
			>
				{t('header.cashCategories')}
			</MenuItem>
			<MenuItem
				navigateTo={ROUTE_INVESTMENTS}
				className={styles.menuLink}
			>
				{t('header.investments')}
			</MenuItem>
			<MenuItem
				navigateTo={ROUTE_STATISTICS}
				className={styles.menuLink}
			>
				{t('header.statistics')}
			</MenuItem>
		</nav>
	);
};

export default NavigationMenu;