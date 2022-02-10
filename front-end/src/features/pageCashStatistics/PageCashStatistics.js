import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Button, Space, } from 'antd';
import { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } from 'services/cashStatisticsApiSlice';

import styles from './PageCashStatistics.module.scss';

import StatisticsRecord from './StatisticsRecord/StatisticsRecord';
import ValueDifference from './ValueDifference/ValueDifference';

const PageCashStatistics = () => {
	const [ isUpdateInProgress, setIsUpdateInProgress ] = useState(false);
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, isFetching, error/*TODO*/ } = useGetCashStatisticsQuery();
	const [createStatisticsRecord, mutation] = useCreateStatisticsRecordMutation();
	const handleGetNewRecord = () => {
		createStatisticsRecord(baseCurrencyKey);
		setIsUpdateInProgress(true);
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
			<div className={styles.list/*TODO create virtual-list*/}>
				{data?.map(record => <Space key={record.id} size='middle' direction='horizontal' align='start' className={styles.listItem}>
					<StatisticsRecord data={record}/>
					<ValueDifference value={record.difference} currencyId={record.currencyId}/>
				</Space>)}
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