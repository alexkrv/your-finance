import { CUR_EUR, CUR_RUB, CUR_USD, } from 'constants/default-values';

import React from 'react';
import PropTypes from 'prop-types';
import { BiDollar, BiEuro, BiRuble } from 'react-icons/bi';
import clsx from 'clsx';

import styles from './CurrencyLabel.module.scss';

const CurrencyLabel = ({ currencyId, className, }) => {
	if(!currencyId) {
		return null;
	}

	const getCurrencyLabel = currencyName => {
		switch (currencyName){
			case CUR_RUB: return <BiRuble/>;
			case CUR_USD: return <BiDollar/>;
			case CUR_EUR: return <BiEuro/>;

			default: return currencyName;
		}
	};

	return (
		<span className={clsx(styles.currency, className)}>
			{getCurrencyLabel(currencyId)}
		</span>
	);
};

CurrencyLabel.propTypes = {
	currencyId: PropTypes.string.isRequired
};

export default CurrencyLabel;