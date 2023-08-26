import React, { useState, useEffect, useRef, } from 'react';
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import {
	CATEGORY_TYPE,
	DEFAULT_EMPTY_STRING,
	DEFAULT_ZERO,
} from '@root/constants/default-values';
import { useAppSelector } from '@root/hooks/hooks';

import styles from './FinancialValue.module.scss';

import { CurrencyLabel } from './CurrencyLabel/CurrencyLabel';

type FinancialValue = {
    value: number | string,
    type?: CATEGORY_TYPE,
    currencyId: string,
    size?: 'small' | 'medium' | 'big',
    className?: string
}

export const FinancialValue = ({ value, type, currencyId, size, className }: FinancialValue) => {
	const timeoutRef = useRef<number | undefined>(undefined);
	const isVisible = useAppSelector(state => state.valueVisibility.isVisible);
	const [isHidden, setIsHidden] = useState(!isVisible);
	const handleClick = () => {
		setIsHidden(!isHidden);

		if(isHidden && !isVisible) {
			timeoutRef.current = window.setTimeout(() => setIsHidden(isHidden), 2000);
		}
	};

	useEffect(() => {
		setIsHidden(!isVisible);
		clearTimeout(timeoutRef.current);
	}, [isVisible]);

	const getSign = (type: CATEGORY_TYPE | undefined) => {
		switch (type){
			case CATEGORY_TYPE.INCOME: // TODO refactor ex POSITIVE / NEGATIVE or do zero-comparison
				return <PlusOutlined className={styles.plusSign}/>;
			case CATEGORY_TYPE.SPENDING:
				return <MinusOutlined className={styles.minusSign}/>;
			case CATEGORY_TYPE.FROZEN:
				return <PlusOutlined className={styles.frozenSign}/>;
			default: return DEFAULT_EMPTY_STRING;
		}
	};

	return (
		<span className={clsx(styles.container, className)}>
			<span className={styles.hiddenValue} data-value-hidden={isHidden}>
				{value === DEFAULT_ZERO ? DEFAULT_EMPTY_STRING : getSign(type)}
				<span className={styles[size!]}>{value}</span>
				<CurrencyLabel currencyId={currencyId}/>
			</span>
			<span onClick={handleClick} className={styles.icon}>
				{ isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined/> }
			</span>
		</span>
	);
};

FinancialValue.defaultProps = {
	size: 'medium'
};