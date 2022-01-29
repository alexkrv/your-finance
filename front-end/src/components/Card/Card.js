import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Card.module.scss';

export const Card = ({ children, className, }) => {
	return (
		<div className={clsx(styles.container, className)}>
			{children}
		</div>
	);
};

Card.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	className: PropTypes.string
};