import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './TextStyler.module.scss';

const TextStyler = ({ children, size, className, secondary }) => (
	<span className={clsx(styles.text, styles[size], className, secondary && styles.secondary)}>
		{children}
	</span>
);

TextStyler.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'big', 'large']),
	className: PropTypes.string,
	secondary: PropTypes.bool,
};

export default TextStyler;