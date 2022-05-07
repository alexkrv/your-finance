import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as apiUrls from '../constants/api-urls';
import { login, } from '../features/pageLogin/PageLoginSlice';
import {
	addBankOrganization,
	addCashCategoryItem,
	deleteCashCategoryItem,
	getCategories
} from '../features/pageCashStructure/PageCashStructureSlice';
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
		addCashCategoryItem: builder.mutation({
			query: (categoryInfo) => ({
				url: apiUrls.API_URL_CASH_CATEGORY_ITEM,
				method: 'POST',
				body: categoryInfo,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(addCashCategoryItem({ ...arg, _id: data._id }));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
		addBankOrganization: builder.mutation({
			query: (bankInfo) => ({
				url: apiUrls.API_URL_BANK_ORGANIZATION,
				method: 'POST',
				body: bankInfo,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(addBankOrganization(data));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
		deleteCashCategoryItem: builder.mutation({
			query: (item) => ({
				url: apiUrls.API_URL_CASH_CATEGORY_ITEM,
				method: 'DELETE',
				body: item,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(deleteCashCategoryItem({ _id: data._id, type: data.type }));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
		getCashCategories: builder.query({
			query: () => apiUrls.API_URL_GET_CASH_CATEGORIES,
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(getCategories(data));
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
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setConversionRates(data));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
	})
});

export const {
	useGetCashStatisticsQuery,
	useCreateStatisticsRecordMutation,
	useLoginMutation,
	useAddCashCategoryItemMutation,
	useDeleteCashCategoryItemMutation,
	useGetAllCurrenciesQuery,
	useGetConversionRatesQuery,
	useGetCashCategoriesQuery,
	useAddBankOrganizationMutation,
} = api;