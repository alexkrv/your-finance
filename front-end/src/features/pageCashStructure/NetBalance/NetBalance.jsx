import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spin, } from 'antd';

import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, DEFAULT_ZERO } from '@root/constants/default-values';
import TextStyler from '@root/components/TextStyler/TextStyler';
import { useGetConversionRatesInBaseCurrency } from '@root/utils/custom-react-hooks';

import styles from './NetBalance.module.scss';

const NetBalance = () => {
	const { t } = useTranslation();
	const { income, spending } = useSelector(state => state.cashCategories.totalSums);
	const { isFetching, baseCurrencyKey } = useGetConversionRatesInBaseCurrency();
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