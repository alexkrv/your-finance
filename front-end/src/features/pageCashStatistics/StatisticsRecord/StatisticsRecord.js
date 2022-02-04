import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';

import TextStyler from '../../../components/TextStyler/TextStyler';
import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';

import styles from './StatisticsRecord.module.scss';

const StatisticsRecord = ({ data }) => {
	return (
		<Space className={styles.container} size='small' direction='horizontal'>
			<TextStyler className={styles.date}>
				{new Date(data.timeStamp).toString()}
			</TextStyler>
			<TextStyler className={styles.value} size='big'>
				<FinancialValue value={`${data.value} ${data.currencyId}`}/>
			</TextStyler>
			<TextStyler className={styles.comment}>
				{data.comment}
			</TextStyler>
		</Space>
	);
};

StatisticsRecord.propTypes = {
	data: PropTypes.shape({
		timeStamp: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		currencyId: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired,
	}).isRequired
};

export default StatisticsRecord;