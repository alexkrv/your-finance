import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, } from 'react-router-dom';
import clsx from 'clsx';

import styles from './MenuItem.module.scss';

const MenuItem = ({ navigateTo, children, }) => {
	const location = useLocation();
	const isActiveItem = location.pathname === navigateTo;

	return (
		<div className={clsx(styles.item, isActiveItem && styles.active)}>
			<Link to={navigateTo} className={styles.itemText}>{children}</Link>
		</div>
	);
};

MenuItem.propTypes = {
	navigateTo: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default MenuItem;