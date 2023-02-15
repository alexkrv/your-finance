import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'use-local-storage';

import { useGetConversionRatesQuery } from '../api';
import { DEFAULT_EMPTY_STRING, DEFAULT_ONE, DEFAULT_ZERO } from '../constants/default-values';
import { changeBaseCurrency } from '../commonSlices/currencyOperationsSlice';

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

export const useBaseCurrencyInitializer = () => {
	const dispatch = useDispatch();
	const [baseCurrencyKey, ] = useLocalStorage('baseCurrencyKey', DEFAULT_EMPTY_STRING);

	dispatch(changeBaseCurrency(baseCurrencyKey));
};