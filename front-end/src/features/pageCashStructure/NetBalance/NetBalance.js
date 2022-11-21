import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spin, } from 'antd';
import { useGetConversionRatesQuery } from 'api/index';

import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, DEFAULT_ZERO } from '../../../constants/default-values';

import styles from './NetBalance.module.scss';

const NetBalance = () => { // TODO delete frozen from avaluation of total + total rename to Profit or Income/Outcome Balance
	const { t } = useTranslation();
	const { income, spending, frozen } = useSelector(state => state.cashCategories.totalSums);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = (income - spending + frozen).toFixed(2);
	const type = total < DEFAULT_ZERO ? CATEGORY_TYPE_SPENDING : CATEGORY_TYPE_INCOME;

	return (
		<div className={styles.container}>
			<div className={styles.title}>{t('cashCategories.netBalance')}</div>
			{ isFetching ?
				<Spin size='small'/>
				: <FinancialValue type={type} value={total} currencyId={baseCurrencyKey} size='big'/>
			}
		</div>
	);
};

export default NetBalance;