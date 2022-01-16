import React from 'react';
import { useTranslation, } from 'react-i18next';
import {
	FlagOutlined,
} from '@ant-design/icons';
import { Button, } from 'antd';
import { Link } from 'react-router-dom';

import ThemeSwitcher from '../../themeSwitcher/ThemeSwitcher';

import styles from './HeaderMenu.module.css';

import { URL_CASH_CATEGORIES, URL_INVESTMENTS, URL_STATISTICS, } from '../../../constants/urls';

const HeaderMenu = () => {
	const { t, i18n } = useTranslation();
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === 'en' ? 'ru' : 'en';

		i18n.changeLanguage(newLanguage);
	};

	return (
		<header className={styles.container}>
			<h1 className={styles.caption}>{t('header.title')}</h1>
			<ThemeSwitcher/>
			<Button type="text" icon={<FlagOutlined />} size='large' onClick={changeLang}>
				{t('i18n.lang')}
			</Button>
			<Link to={URL_CASH_CATEGORIES}>{t('header.cashCategories')}</Link>
			<Link to={URL_INVESTMENTS}>{t('header.investments')}</Link>
			<Link to={URL_STATISTICS}>{t('header.statistics')}</Link>
		</header>

	);
};

export default HeaderMenu;