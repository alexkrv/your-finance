import React from 'react';
import PropTypes from 'prop-types';

import StatisticsRecord from '../StatisticsRecord/StatisticsRecord';

import styles from './StatisticsList.module.scss';

const StatisticsList = ({ data, }) => (
	<div className={styles.list}>
		{data?.map(record => <StatisticsRecord key={record._id} data={record}/>)}
	</div>
);

StatisticsList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		currencyId: PropTypes.string.isRequired,
		date: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		difference: PropTypes.number.isRequired,
		structure: PropTypes.object.isRequired,
		total: PropTypes.shape({
			difference: PropTypes.number.isRequired,
			valueInRub: PropTypes.number.isRequired,
			valueInUsd: PropTypes.number.isRequired,
		}),
		value: PropTypes.number.isRequired,
		valueInRub: PropTypes.number.isRequired,
		valueInUsd: PropTypes.number.isRequired,
	}))
};

export default StatisticsList;