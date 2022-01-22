import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

import HeaderMenu from './headerMenu/HeaderMenu';

const Layout = () => {

	return (
		<div className={styles.container}>
			<HeaderMenu/>

			<Outlet />
		</div>
	);
};

export default Layout;