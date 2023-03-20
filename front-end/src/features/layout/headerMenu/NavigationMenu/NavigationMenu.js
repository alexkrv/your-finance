import { ROUTE_CASH_CATEGORIES, ROUTE_HOME, ROUTE_INVESTMENTS, ROUTE_STATISTICS } from 'constants/routes';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, } from 'react-router-dom';
import { Menu } from 'antd';
import {
	HomeOutlined,
	PieChartOutlined,
	ProfileOutlined,
	StockOutlined
} from '@ant-design/icons';

import styles from './NavigationMenu.module.scss';

const NavigationMenu = () => {
	const { t, } = useTranslation();
	const [current, setCurrent] = useState(ROUTE_HOME);
	const onClick = event => setCurrent(event.key);

	useEffect(() => {
		setCurrent(window.location.pathname);
	}, []);

	const items = [
		{
			label: <Link to={ROUTE_HOME}>
				{t('header.home')}
			</Link>,
			key: ROUTE_HOME,
			icon: <HomeOutlined />,
		},
		{
			label: <Link to={ROUTE_CASH_CATEGORIES}>
				{t('header.bankAccounts')}
			</Link>,
			key: ROUTE_CASH_CATEGORIES,
			icon: <ProfileOutlined />,
		},
		{
			label: <Link to={ROUTE_INVESTMENTS}>
				{t('header.investments')}
			</Link>,
			key: ROUTE_INVESTMENTS,
			icon: <StockOutlined />
		},
		{
			label: <Link to={ROUTE_STATISTICS}>
				{t('header.statistics')}
			</Link>,
			key: ROUTE_STATISTICS,
			icon: <PieChartOutlined />
		},
	];
	// TODO change menu styles

	return (
		<Menu
			onClick={onClick}
			selectedKeys={[current]}
			mode="horizontal"
			items={items}
			className={styles.menu}
			theme={'dark'}
		/>
	);
};

export default NavigationMenu;