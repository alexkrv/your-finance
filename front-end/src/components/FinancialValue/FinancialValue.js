import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './FinancialValue.module.scss';
import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING, DEFAULT_EMPTY_STRING, DEFAULT_ZERO,
} from '../../constants/default-values';
import { useGetAllCurrenciesQuery } from '../../services/currencyApiSlice';

export const FinancialValue = ({ value, type, currencyId, size }) => {
	const timeoutRef = useRef(null);
	const { data, } = useGetAllCurrenciesQuery();
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
			case CATEGORY_TYPE_INCOME:
				return <PlusOutlined className={styles.plusSign}/>;
			case CATEGORY_TYPE_SPENDING:
				return <MinusOutlined className={styles.minusSign}/>;
			case CATEGORY_TYPE_FROZEN:
				return <PlusOutlined className={styles.frozenSign}/>;
			default: return DEFAULT_EMPTY_STRING;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.hiddenValue} data-value-hidden={isHidden}>
				{value === DEFAULT_ZERO ? DEFAULT_EMPTY_STRING : getSign(type)}
				<span className={styles[size]}>{value}</span>
				{data ?
					<span className={styles.currency}>&nbsp;{data[currencyId].currencySymbol}</span>
					: DEFAULT_EMPTY_STRING
				}
			</div>
			<div onClick={handleClick} className={styles.icon}>{ isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined/> }</div>
		</div>
	);
};

FinancialValue.propTypes = {
	value: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	currencyId: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'big']),
};