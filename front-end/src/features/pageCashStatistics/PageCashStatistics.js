import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Button, } from 'antd';
import { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } from 'api';

import { DEFAULT_ZERO } from '../../constants/default-values';
import { FinancialValue } from '../../components/FinancialValue/FinancialValue';

import styles from './PageCashStatistics.module.scss';

import StatisticsRecord from './StatisticsRecord/StatisticsRecord';
import BarsCashStatistics from './BarsCashStatistics/BarsCashStatistics';
import { PieChart } from './PieChart/PieChart';

const PageCashStatistics = () => {
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error/*TODO*/ } = useGetCashStatisticsQuery(baseCurrencyKey);
	const [createStatisticsRecord, { isLoading }] = useCreateStatisticsRecordMutation(baseCurrencyKey);
	const handleGetNewRecord = () => createStatisticsRecord(baseCurrencyKey);
	const pieParts = data?.at(-1)?.structure;
	const totalValueInBaseCurrency = data?.at(-1).total?.valueInBaseCurrency?.toFixed(0) || DEFAULT_ZERO;
	console.log('data', data);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<TextStyler size='large' className={styles.headerCaption}>
					{t('cashStatistics.balanceStates')}
				</TextStyler>
				<TextStyler>
					{baseCurrencyKey}
				</TextStyler>
			</div>
			<div className={styles.list}>
				{data?.map(record => <StatisticsRecord key={record._id} data={record}/>)}
			</div>
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
			<div className={styles.chartsContainer}>
				<PieChart
					className={styles.pieChart}
					width={400}
					height={400}
					data={pieParts}
					legend={<FinancialValue
						size='big'
						value={totalValueInBaseCurrency}
						currencyId={baseCurrencyKey}
					/>}
				/>
				<BarsCashStatistics
					className={styles.barsChart}
					width={400}
					height={400}
					data={data}
				/>
			</div>
		</div>
	);
};

export default PageCashStatistics;