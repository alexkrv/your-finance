import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_EMPTY_STRING,
	DEFAULT_ZERO,
} from '../../constants/default-values';

import styles from './FinancialValue.module.scss';

import CurrencyLabel from './CurrencyLabel/CurrencyLabel';

export const FinancialValue = ({ value, type, currencyId, size, className }) => {
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

	const getSign = (type) => {
		switch (type){
			case CATEGORY_TYPE_INCOME: // TODO refactor ex POSITIVE / NEGATIVE or do zero-comparison
				return <PlusOutlined className={styles.plusSign}/>;
			case CATEGORY_TYPE_SPENDING:
				return <MinusOutlined className={styles.minusSign}/>;
			case CATEGORY_TYPE_FROZEN:
				return <PlusOutlined className={styles.frozenSign}/>;
			default: return DEFAULT_EMPTY_STRING;
		}
	};

	return (
		<span className={clsx(styles.container, className)}>
			<span className={styles.hiddenValue} data-value-hidden={isHidden}>
				{value === DEFAULT_ZERO ? DEFAULT_EMPTY_STRING : getSign(type)}
				<span className={styles[size]}>{Math.abs(value)}</span>
				<CurrencyLabel currencyId={currencyId}/>
			</span>
			<span onClick={handleClick} className={styles.icon}>
				{ isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined/> }
			</span>
		</span>
	);
};

FinancialValue.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	type: PropTypes.string,
	currencyId: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'big']),
};