import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, } from 'antd';

import TextStyler from '@root/components/TextStyler/TextStyler';
import { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } from '@root/api';
import { DEFAULT_ZERO } from '@root/constants/default-values';
import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import { CurrencyLabel } from '@root/components/FinancialValue/CurrencyLabel/CurrencyLabel';

import { useCommonErrorMessage } from '../../utils/custom-react-hooks';

import styles from './PageCashStatistics.module.scss';

import BarsCashStatistics from './BarsCashStatistics/BarsCashStatistics';
import { PieChart } from './PieChart/PieChart';
import StatisticsList from './StatisticsList/StatisticsList';

const PageCashStatistics = () => {
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const isVisible = useSelector(state => state.valueVisibility.isVisible);
	const { data, error } = useGetCashStatisticsQuery(baseCurrencyKey);
	const [createStatisticsRecord, { isLoading }] = useCreateStatisticsRecordMutation(baseCurrencyKey);
	const handleGetNewRecord = () => createStatisticsRecord(baseCurrencyKey);
	const pieParts = data?.at(-1)?.structure;
	const totalValueInBaseCurrency = data?.at(-1)?.total?.valueInBaseCurrency?.toFixed(0) || DEFAULT_ZERO;

	useCommonErrorMessage({ error });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<TextStyler size='large'>
					{t('cashStatistics.balanceStates')}
				</TextStyler>
				&#44;
				<CurrencyLabel
					currencyId={baseCurrencyKey}
					className={styles.currencyLabel}
				/>
			</div>
			{ data && <StatisticsList data={data}/>}
			<Button
				type="primary"
				shape="round"
				size='large'
				onClick={handleGetNewRecord}
				className={styles.buttonGetState}
				loading={isLoading}
			>
				{t('cashStatistics.getCurrentState')}&nbsp;{baseCurrencyKey}
			</Button>
			<div className={styles.chartsContainer} data-value-hidden={!isVisible}>
				{Boolean(data?.length) && <BarsCashStatistics
					className={styles.barsChart}
					width={400}
					height={400}
					data={data}
				/>}
				{pieParts && <PieChart
					className={styles.pieChart}
					width={400}
					height={400}
					data={pieParts}
					legend={<FinancialValue
						size="big"
						value={totalValueInBaseCurrency}
						currencyId={baseCurrencyKey}
					/>}
				/>}
			</div>
		</div>
	);
};

export default PageCashStatistics;