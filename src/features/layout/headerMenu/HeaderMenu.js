import React from 'react';
import { useTranslation, } from 'react-i18next';
import {
	FlagOutlined,
} from '@ant-design/icons';
import { Button, } from 'antd';

import styles from './HeaderMenu.module.scss';

import { URL_CASH_CATEGORIES, URL_HOME, URL_INVESTMENTS, URL_STATISTICS, } from '../../../constants/urls';

import ThemeSwitcher from '../../themeSwitcher/ThemeSwitcher';
import MenuItem from './MenuItem/MenuItem';

const HeaderMenu = () => {
	const { t, i18n } = useTranslation();
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLanguage);
	};

	return (
		<div className={styles.container}>
			<div className={styles.firstFloorMenu}>
				<h1 className={styles.caption}>{t('header.title')}</h1>
				<div className={styles.controls}>
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