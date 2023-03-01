import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spin, } from 'antd';
import { useGetConversionRatesQuery } from 'api/index';

import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, DEFAULT_ZERO } from '../../../constants/default-values';
import TextStyler from '../../../components/TextStyler/TextStyler';

import styles from './NetBalance.module.scss';

const NetBalance = () => {
	const { t } = useTranslation();
	const { income, spending } = useSelector(state => state.cashCategories.totalSums);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = (income - spending).toFixed(2);
	const type = total < DEFAULT_ZERO ? CATEGORY_TYPE_SPENDING : CATEGORY_TYPE_INCOME;

	return (
		<div className={styles.container}>
			<TextStyler size='large'>
				{t('cashCategories.netBalance')}
				&#58;&nbsp;
			</TextStyler>
			{ isFetching ?
				<Spin size='small' wrapperClassName={styles.spinWrapper}/>
				: <FinancialValue type={type} value={total} currencyId={baseCurrencyKey} size='big'/>
			}
		</div>
	);
};

export default NetBalance;