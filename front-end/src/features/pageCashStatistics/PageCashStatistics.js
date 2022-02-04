import { DEFAULT_ZERO } from 'constants/default-values';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TextStyler from 'components/TextStyler/TextStyler';
import { Space } from 'antd';

import styles from './PageCashStatistics.module.scss';

import { getStatistics } from './PageCashStatisticsSlice';
import StatisticsRecord from './StatisticsRecord/StatisticsRecord';
import MonthDifference from './MonthDifference/MonthDifference';

const PageCashStatistics = () => {
	const ref = useRef({ value: null, currencyId: null });
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
			{statistics.map((record, index) => {
				const isEven = (index+1)%2 === DEFAULT_ZERO;

				if(!isEven) {
					ref.current.value = record.value;
					ref.current.currencyId = record.currencyId;
				}

				return <Space key={record.id} size='middle' direction='horizontal'>
					<StatisticsRecord data={record}/>
					{ isEven ? <MonthDifference
						currentData={record}
						previousData={ref.current}
					/> : null}
				</Space>;
			}
			)}
		</div>
	);
};

PageCashStatistics.propTypes = {

};

export default PageCashStatistics;