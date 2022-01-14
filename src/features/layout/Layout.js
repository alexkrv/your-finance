import React from 'react';
import { Button, } from 'antd';
import {
	EyeOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { useTranslation, } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import HeaderMenu from './headerMenu/HeaderMenu';

const Layout = () => {
	const { t, } = useTranslation();

	return (
		<div>
			<HeaderMenu/>
			<div className={styles.appHeader}>
				<Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
				{t('description.part1')}
			</div>

			<Outlet />
		</div>
	);
};

export default Layout;