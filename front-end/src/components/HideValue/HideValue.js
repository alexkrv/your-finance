import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import styles from './HideValue.module.scss';

export const HideValue = ({ children }) => {
	const timeoutRef = useRef(null);
	const isVisible = useSelector(state => state.valueVisibility.isVisible);
	const [isHidden, setIsHidden] = useState(!isVisible);
	const handleClick = () => {
		setIsHidden(!isHidden);

		if(isHidden && !isVisible) {
			timeoutRef.current = setTimeout(() => setIsHidden(isHidden), 2000);
		}
	};

	useEffect(() => {
		setIsHidden(!isVisible);
		clearTimeout(timeoutRef.current);
	}, [isVisible]);

	return (
		<div className={styles.container}>
			<div className={styles.hiddenValue} data-value-hidden={isHidden}>{children}</div>
			<div onClick={handleClick} className={styles.icon}>{ isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined/> }</div>
		</div>
	);
};

HideValue.propTypes = {
	children: PropTypes.node.isRequired
};