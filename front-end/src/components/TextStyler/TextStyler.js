import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './TextStyler.module.scss';
// TODO delete. Use Typography component instead
const TextStyler = ({ children, size, className }) => (
	<span className={clsx(styles.text, styles[size], className)}>
		{children}
	</span>
);

TextStyler.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'big', 'large']),
	className: PropTypes.string,
};

export default TextStyler;