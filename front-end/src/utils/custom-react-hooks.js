import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'use-local-storage';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

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

export const useGetTotalInBaseCurrency = items => {
	const baseCurrencyKey = useSelector(state => state.currencies.baseCurrencyKey);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = isFetching || error ? DEFAULT_ZERO
		: parseFloat(items.reduce((acc, el) => acc + el.value/(data.rates[el.currency].value || 1), DEFAULT_ZERO)
			.toFixed(1));

	return { total, isFetching, error };
};

export const useCommonErrorMessage = ({ error, text, duration = 2 }) => {
	const { t } = useTranslation();

	if(error) {
		message.error(text || t('common.commonError'), duration);
	}
};

export const useGetConversionRatesInBaseCurrency = () => {
	const baseCurrencyKey = useSelector(state => state.currencies.baseCurrencyKey);

	return {
		...useGetConversionRatesQuery(baseCurrencyKey),
		baseCurrencyKey
	};
};