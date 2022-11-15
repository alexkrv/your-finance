import { useSelector } from 'react-redux';

import { useGetConversionRatesQuery } from '../api';
import { DEFAULT_ONE, DEFAULT_ZERO } from '../constants/default-values';

export const useConvertedCurrencyValue = ({ value = DEFAULT_ZERO, currencyId }) => {
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);

	const convertedValue = isFetching || error ?
		DEFAULT_ZERO
		: parseFloat((value/(data.rates[currencyId].value || DEFAULT_ONE)).toFixed(DEFAULT_ONE));

	return {
		error,
		isFetching,
		convertedValue,
		currencyId: baseCurrencyKey
	};
};