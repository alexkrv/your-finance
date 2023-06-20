import React from 'react';
import { useTranslation, } from 'react-i18next';
import {
	FlagOutlined,
	LockOutlined,
	UnlockOutlined,
} from '@ant-design/icons';
import { Button, Space, } from 'antd';
import { useSelector, useDispatch, } from 'react-redux';
import useLocalStorage from 'use-local-storage';

import SwitchTheme from '../../switchTheme/SwitchTheme';
import { logout } from '../../pageLogin/PageLoginSlice';
import { DEFAULT_EMPTY_STRING, LANG_EN, LANG_RU } from '@root/constants/default-values';
import SwitchValueVisibility from '../../switchValueVisibility/SwitchValueVisibility';
import SelectCurrency from '../../selectCurrency/SelectCurrency';
import { changeBaseCurrency } from '@root/commonSlices/currencyOperationsSlice';

import styles from './HeaderMenu.module.scss';

import NavigationMenu from './NavigationMenu/NavigationMenu';

const HeaderMenu = () => {
	const { t, i18n } = useTranslation();
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const [baseCurrencyKey, setBaseCurrency] = useLocalStorage('baseCurrencyKey', DEFAULT_EMPTY_STRING);
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === LANG_EN ? LANG_RU : LANG_EN;

		i18n.changeLanguage(newLanguage);
	};
	const handleLogout = () => dispatch(logout());
	const changeMainCurrency = (value) => {
		dispatch(changeBaseCurrency(value));
		setBaseCurrency(value);
	};

	return (
		<header className={styles.container}>
			<div className={styles.firstFloorMenu}>
				<h1 className={styles.caption}>{t('header.title')}</h1>
				<div className={styles.controls}>
					<Button
						type="text"
						icon={ isAuthenticated ? <UnlockOutlined /> : <LockOutlined /> }
						size='large'
						onClick={handleLogout}
						className={styles.logInOut}
					>
						{t(isAuthenticated ? 'auth.logout' : 'auth.login')}
					</Button>
					<SwitchTheme/>
					<Button
						type="text"
						icon={<FlagOutlined />}
						size='large'
						onClick={changeLang}
						className={styles.langSwitcher}
					>
						{t('i18n.lang')}
					</Button>
				</div>
			</div>
			<div className={styles.secondFloorMenu}>
				<NavigationMenu/>
				{ isAuthenticated && <Space>
					<SwitchValueVisibility/>
					<SelectCurrency
						defaultValue={baseCurrencyKey}
						onChange={changeMainCurrency}
					/>
				</Space> }
			</div>
		</header>
	);
};

export default HeaderMenu;