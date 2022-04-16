import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL_BASE } from '../constants/api-urls';
import { ROUTE_LOGIN } from '../constants/routes';
import { login } from '../features/pageLogin/PageLoginSlice';

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
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					await queryFulfilled;
					dispatch(login(true));
				} catch (err) {
					dispatch(login(false));
				}
			},
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
			transformResponse: (response) =>
				JSON.parse(response)?.results,
			query: () => 'currencies',
		}),
		getConversionRates: builder.query({
			query: (baseCurrencyKey) => `conversion-rates?base=${baseCurrencyKey}`,
			transformResponse: (response) => {
				const { meta, data } = JSON.parse(response);

				return { meta, data };
			},
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