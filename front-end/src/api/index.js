import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as apiUrls from '../constants/api-urls';
import { login, } from '../features/pageLogin/PageLoginSlice';
import { addCashCategory as addCategory } from '../features/pageCashStructure/PageCashStructureSlice';
import { setCurrenciesInfo, setConversionRates, } from '../commonSlices/currencyOperationsSlice';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrls.API_URL_BASE }),
	tagTypes: ['CashStatistics'],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: apiUrls.API_URL_LOGIN,
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
		addCashCategory: builder.mutation({
			query: (categoryInfo) => ({
				url: `${apiUrls.API_URL_ADD_CASH_CATEGORY}/${categoryInfo.type}`,
				method: 'POST',
				body: categoryInfo,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(addCategory({ ...arg, id: data.id }));
				} catch (err) {
					//TODO something went wrong...
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
			query: () => 'currencies',
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setCurrenciesInfo(data));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
		getConversionRates: builder.query({
			query: (baseCurrencyKey) => `conversion-rates?base=${baseCurrencyKey}`,
			transformResponse: (response) => {
				const { meta, data } = JSON.parse(response);

				return { meta, data };
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data: { data: conversionRates } } = await queryFulfilled;

					dispatch(setConversionRates(conversionRates));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		})
	})
});

export const {
	useGetCashStatisticsQuery,
	useCreateStatisticsRecordMutation,
	useLoginMutation,
	useAddCashCategoryMutation,
	useGetAllCurrenciesQuery,
	useGetConversionRatesQuery
} = api;