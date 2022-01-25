import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './NetBalance.module.scss';

import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, DEFAULT_ZERO } from '../../../constants/default-values';

const NetBalance = () => {
	const { t } = useTranslation();
	const { income, spending, frozen } = useSelector(state => state.cashCategories.totalSums);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const total = income - spending + frozen;
	const type = total < DEFAULT_ZERO ? CATEGORY_TYPE_SPENDING : CATEGORY_TYPE_INCOME;

	return (
		<div className={styles.container}>
			<div className={styles.title}>{t('cashCategories.netBalance')}</div>
			<FinancialValue type={type} value={total} currencyId={baseCurrencyKey} size='big'/>
		</div>
	);
};

export default NetBalance;