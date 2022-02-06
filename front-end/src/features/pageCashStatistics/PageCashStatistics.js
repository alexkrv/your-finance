import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Button, Space } from 'antd';

import styles from './PageCashStatistics.module.scss';

import { getStatistics } from './PageCashStatisticsSlice';
import StatisticsRecord from './StatisticsRecord/StatisticsRecord';
import ValueDifference from './ValueDifference/ValueDifference';

const PageCashStatistics = () => {
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const { statistics } = useSelector(state => state.cashStatistics);
	const { baseCurrencyKey } = useSelector(state => state.currencies);

	useEffect(() => {
		dispatch(getStatistics());
	}, [dispatch]);

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
			{statistics.map(record => <Space key={record.id} size='middle' direction='horizontal' align='start'>
				<StatisticsRecord data={record}/>
				<ValueDifference value={record.difference} currencyId={record.currencyId}/>
			</Space>)}
			<Button type="primary" shape="round" size='large' onClick={() => {}} className={styles.getState}>
				{t('cashStatistics.getCurrentState')}&nbsp;{baseCurrencyKey}
			</Button>
		</div>
	);
};

PageCashStatistics.propTypes = {

};

export default PageCashStatistics;