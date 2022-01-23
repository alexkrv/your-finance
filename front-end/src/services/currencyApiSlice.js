import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_BASE } from '../constants/api-urls';
import { DEFAULT_EMPTY_STRING } from '../constants/default-values';

export const currencyApi = createApi({
	reducerPath: 'currencyApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_BASE }),
	endpoints: (builder) => ({
		getAllCurrencies: builder.query({
			transformResponse: (response, meta, arg) =>
				JSON.parse(response)?.results,
			query: () => 'currencies',
		}),
		getConversionRates: builder.query({
			transformResponse: (response, meta, arg) => {
				const rawRes = JSON.parse(response);

				rawRes.query.apikey = DEFAULT_EMPTY_STRING;

				return rawRes;
			},

			query: (baseCurrencyKey) => `conversion-rates?base=${baseCurrencyKey}`,
		})
	})
});

export const { useGetAllCurrenciesQuery, useGetConversionRatesQuery, } = currencyApi;