import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Button, } from 'antd';
import { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } from 'api';

import styles from './PageCashStatistics.module.scss';

import StatisticsRecord from './StatisticsRecord/StatisticsRecord';
import BarsCashStatistics from './BarsCashStatistics/BarsCashStatistics';

const PageCashStatistics = () => {
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error/*TODO*/ } = useGetCashStatisticsQuery(baseCurrencyKey);
	const [createStatisticsRecord, { isLoading }] = useCreateStatisticsRecordMutation(baseCurrencyKey);
	const handleGetNewRecord = () => createStatisticsRecord(baseCurrencyKey);

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
			{data && <BarsCashStatistics
				className={styles.barsChart}
				width={500}
				height={500}
				verticalMargin={100}
				data={data}
			/>}
		</div>
	);
};

export default PageCashStatistics;