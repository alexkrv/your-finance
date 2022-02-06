import React from 'react';
import PropTypes from 'prop-types';

import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';

const ValueDifference = ({ value, currencyId }) => <FinancialValue value={value} currencyId={currencyId}/>;

ValueDifference.propTypes = {
	value: PropTypes.number.isRequired,
	currencyId: PropTypes.string.isRequired,
};

export default ValueDifference;