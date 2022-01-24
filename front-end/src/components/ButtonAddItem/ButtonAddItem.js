import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircleOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import styles from './ButtonAddItem.module.scss';

const ButtonAddItem = ({ text, size, ...props }) => (
	<div {...props} className={clsx( styles.container, props.className)}>
		<PlusCircleOutlined className={clsx(styles.icon, styles[size])}/>
		{text}
	</div>
);

ButtonAddItem.propTypes = {
	text: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
	props: PropTypes.object,
};

export default ButtonAddItem;