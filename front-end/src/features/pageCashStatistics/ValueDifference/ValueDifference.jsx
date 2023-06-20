import React from 'react';
import PropTypes from 'prop-types';

import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';

const ValueDifference = ({ value, currencyId, type, className }) =>
	<FinancialValue
		className={className}
		value={value}
		currencyId={currencyId}
		type={type}
	/>;

ValueDifference.propTypes = {
	value: PropTypes.number.isRequired,
	currencyId: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default ValueDifference;