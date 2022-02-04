import React from 'react';
import PropTypes from 'prop-types';

import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';

const MonthDifference = ({ currentData, previousData }) => {

	return (
		<div>
			{previousData.value && previousData.currencyId ?
				<FinancialValue value={currentData.value - previousData.value}/>
				: null}
		</div>
	);
};

MonthDifference.propTypes = {
	currentData: PropTypes.shape({
		value: PropTypes.number.isRequired,
		currencyId: PropTypes.string.isRequired,
	}).isRequired,
	previousData: PropTypes.shape({
		value: PropTypes.number.isRequired,
		currencyId: PropTypes.string.isRequired,
	}).isRequired
};

export default MonthDifference;