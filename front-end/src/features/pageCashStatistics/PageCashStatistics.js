import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Button, } from 'antd';
import { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } from 'api';

import styles from './PageCashStatistics.module.scss';

import StatisticsRecord from './StatisticsRecord/StatisticsRecord';

const PageCashStatistics = () => {
	const [ isUpdateInProgress, setIsUpdateInProgress ] = useState(false);
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, isFetching, error/*TODO*/ } = useGetCashStatisticsQuery(baseCurrencyKey);
	const [createStatisticsRecord,] = useCreateStatisticsRecordMutation(baseCurrencyKey);
	const handleGetNewRecord = () => {
		setIsUpdateInProgress(true);
		createStatisticsRecord(baseCurrencyKey);
	};

	useEffect(() => {
		if(!isFetching) {
			setIsUpdateInProgress(false);
		}
	}, [isFetching]);

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
				className={styles.getState}
				loading={isUpdateInProgress}
			>
				{t('cashStatistics.getCurrentState')}&nbsp;{baseCurrencyKey}
			</Button>
		</div>
	);
};

export default PageCashStatistics;