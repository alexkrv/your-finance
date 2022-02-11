import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL_BASE } from '../constants/api-urls';
import { ROUTE_LOGIN } from '../constants/routes';
import { DEFAULT_EMPTY_STRING } from '../constants/default-values';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_BASE }),
	tagTypes: ['CashStatistics'],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: ROUTE_LOGIN,
				method: 'POST',
				body: credentials,
			}),
		}),
		getCashStatistics: builder.query({
			query: () => 'cash-statistics',
			providesTags: ['CashStatistics'],
		}),
		createStatisticsRecord: builder.mutation({
			query: (currencyId) => `create-statistics-record/${currencyId}`,
			invalidatesTags: ['CashStatistics'],
		}),
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

export const {
	useGetCashStatisticsQuery,
	useCreateStatisticsRecordMutation,
	useLoginMutation,
	useGetAllCurrenciesQuery,
	useGetConversionRatesQuery
} = api;