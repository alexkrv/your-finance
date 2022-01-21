import React from 'react';
import PropTypes from 'prop-types';

import styles from './CategoryItem.module.scss';

import { CUR_USD, CUR_EUR, CUR_RUB, CATEGORY_TYPE_INCOME, } from '../../../../constants/default-values';
import { HideValue } from '../../../../components/HideValue/HideValue';

export const CategoryItem = ({ item }) => {
	const currency = {
		[CUR_USD]: '$',
		[CUR_EUR]: '€',
		[CUR_RUB]: '₽'
	};

	return (
		<div className={styles.container}>
			<div className={styles.sourceName}>{item.sourceName}</div>
			<HideValue>
				<div className={styles.sourceValue}>{item.type === CATEGORY_TYPE_INCOME ? '+' : '-'}{item.sourceValue}{currency[item.currency]}</div>
			</HideValue>
		</div>
	);
};

CategoryItem.propTypes = {
	item: PropTypes.shape({
		sourceName: PropTypes.string.isRequired,
		sourceValue: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	})
};