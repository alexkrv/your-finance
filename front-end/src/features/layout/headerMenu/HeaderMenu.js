import React from 'react';
import { useTranslation, } from 'react-i18next';
import {
	FlagOutlined,
	LockOutlined,
	UnlockOutlined,
} from '@ant-design/icons';
import { Button, Space, } from 'antd';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './HeaderMenu.module.scss';

import { ROUTE_CASH_CATEGORIES, ROUTE_HOME, ROUTE_INVESTMENTS, ROUTE_LOGIN, ROUTE_STATISTICS, } from '../../../constants/routes';

import SwitchTheme from '../../switchTheme/SwitchTheme';
import MenuItem from './MenuItem/MenuItem';
import { logout } from '../../pageLogin/PageLoginSlice';
import { LANG_EN, LANG_RU } from '../../../constants/default-values';
import SwitchValueVisibility from '../../switchValueVisibility/SwitchValueVisibility';
import SelectCurrency from '../../selectCurrency/SelectCurrency';
import { changeBaseCurrency } from '../../../commonSlices/currencyOperationsSlice';

const HeaderMenu = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === LANG_EN ? LANG_RU : LANG_EN;

		i18n.changeLanguage(newLanguage);
	};
	const handleLogout = () => dispatch(logout());
	const handleLogin = () => navigate(ROUTE_LOGIN);
	const changeMainCurrency = (value) => dispatch(changeBaseCurrency(value));

	return (
		<div className={styles.container}>
			<div className={styles.firstFloorMenu}>
				<h1 className={styles.caption}>{t('header.title')}</h1>
				<div className={styles.controls}>
					{ isAuthenticated && <Button type="text" icon={<LockOutlined />} size='large' onClick={handleLogout} className={styles.logout}>
						{t('auth.logout')}
					</Button> }
					{ !isAuthenticated && <Button type="text" icon={<UnlockOutlined />} size='large' onClick={handleLogin} className={styles.login}>
						{t('auth.login')}
					</Button> }
					<SwitchTheme/>
					<Button type="text" icon={<FlagOutlined />} size='large' onClick={changeLang} className={styles.langSwitcher}>
						{t('i18n.lang')}
					</Button>
				</div>
			</div>
			<div className={styles.secondFloorMenu}>
				<Space>
					<MenuItem navigateTo={ROUTE_HOME}>{t('header.home')}</MenuItem>
					<MenuItem navigateTo={ROUTE_CASH_CATEGORIES} className={styles.menuLink}>{t('header.cashCategories')}</MenuItem>
					<MenuItem navigateTo={ROUTE_INVESTMENTS} className={styles.menuLink}>{t('header.investments')}</MenuItem>
					<MenuItem navigateTo={ROUTE_STATISTICS} className={styles.menuLink}>{t('header.statistics')}</MenuItem>
				</Space>
				{ isAuthenticated && <Space>
					<SelectCurrency onChange={changeMainCurrency}/>
					<SwitchValueVisibility/>
				</Space> }
			</div>
		</div>

	);
};

export default HeaderMenu;