import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './TextStyler.module.scss';

const TextStyler = ({ text, size, className }) => (
	<div className={clsx(styles.text, styles[size], className)}>
		{text}
	</div>
);

TextStyler.propTypes = {
	text: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'big', 'large']),
	className: PropTypes.string,
};

export default TextStyler;