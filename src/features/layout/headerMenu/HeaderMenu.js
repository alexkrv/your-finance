import React from 'react';
import { useTranslation, } from 'react-i18next';
import {
	FlagOutlined,
	LockOutlined,
	UnlockOutlined,
} from '@ant-design/icons';
import { Button, } from 'antd';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './HeaderMenu.module.scss';

import { URL_CASH_CATEGORIES, URL_HOME, URL_INVESTMENTS, URL_LOGIN, URL_STATISTICS, } from '../../../constants/urls';

import ThemeSwitcher from '../../themeSwitcher/ThemeSwitcher';
import MenuItem from './MenuItem/MenuItem';
import { logout } from '../../loginPage/LoginPageSlice';

const HeaderMenu = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLanguage);
	};
	const handleLogout = () => dispatch(logout());
	const handleLogin = () => navigate(URL_LOGIN);

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
					<ThemeSwitcher/>
					<Button type="text" icon={<FlagOutlined />} size='large' onClick={changeLang} className={styles.langSwitcher}>
						{t('i18n.lang')}
					</Button>
				</div>
			</div>
			<div className={styles.secondFloorMenu}>
				<MenuItem navigateTo={URL_HOME}>{t('header.home')}</MenuItem>
				<MenuItem navigateTo={URL_CASH_CATEGORIES} className={styles.menuLink}>{t('header.cashCategories')}</MenuItem>
				<MenuItem navigateTo={URL_INVESTMENTS} className={styles.menuLink}>{t('header.investments')}</MenuItem>
				<MenuItem navigateTo={URL_STATISTICS} className={styles.menuLink}>{t('header.statistics')}</MenuItem>
			</div>
		</div>

	);
};

export default HeaderMenu;