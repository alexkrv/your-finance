import React from 'react';
import { BiDollar, BiEuro, BiRuble } from 'react-icons/bi';
import clsx from 'clsx';

import { CUR_EUR, CUR_RUB, CUR_USD, } from '@root/constants/default-values';

import styles from './CurrencyLabel.module.scss';

type CurrencyLabelType = {
    currencyId: string,
    className?: string,
}

enum CUR_LABEL {
    RUB = CUR_RUB,
    USD = CUR_USD,
    EUR = CUR_EUR
}

export const CurrencyLabel = ({ currencyId, className, }: CurrencyLabelType) => {
	if(!currencyId) {
		return null;
	}

	const getCurrencyLabel = (currencyName: any) => {
		switch (currencyName){
			case CUR_LABEL.RUB: return <BiRuble/>;
			case CUR_LABEL.USD: return <BiDollar/>;
			case CUR_LABEL.EUR: return <BiEuro/>;

			default: return currencyName;
		}
	};

	return (
		<span className={clsx(styles.currency, className)}>
			{getCurrencyLabel(currencyId)}
		</span>
	);
};