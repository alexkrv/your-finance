import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as apiUrls from '../constants/api-urls';
import { login, } from '../features/pageLogin/PageLoginSlice';
import {
	addCashCategoryItem,
	deleteCashCategoryItem,
	getCategories
} from '../features/pageCashStructure/PageCashStructureSlice';
import { setCurrenciesInfo, setConversionRates, } from '../commonSlices/currencyOperationsSlice';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrls.API_URL_BASE }),
	tagTypes: ['CashStatistics', 'BanksList'],
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
					// TODO implement work with tags instead
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
			invalidatesTags: ['BanksList'],
		}),
		deleteBankOrganization: builder.mutation({
			query: (bankId) => ({
				url: apiUrls.API_URL_BANK_ORGANIZATION,
				method: 'DELETE',
				body: { bankId },
			}),
			invalidatesTags: ['BanksList'],
		}),
		addBankAccount: builder.mutation({
			query: (accountInfo) => ({
				url: apiUrls.API_URL_BANK_ORGANIZATION,
				method: 'PUT',
				body: accountInfo,
			}),
			invalidatesTags: ['BanksList'],
		}),
		editBankAccount: builder.mutation({
			query: (accountInfo) => ({
				url: apiUrls.API_URL_BANK_ORGANIZATION,
				method: 'PATCH',
				body: accountInfo,
			}),
			invalidatesTags: ['BanksList'],
		}),
		deleteBankAccount: builder.mutation({
			query: (accountInfo) => ({
				url: apiUrls.API_URL_BANK_ACCOUNT,
				method: 'DELETE',
				body: accountInfo,
			}),
			invalidatesTags: ['BanksList'],
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
		getBanksList: builder.query({
			query: () => apiUrls.API_URL_BANK_ORGANIZATION,
			providesTags: ['BanksList'],
		}),
		getCashStatistics: builder.query({
			query: baseCurrencyKey => `cash-statistics?base=${baseCurrencyKey}`,
			providesTags: ['CashStatistics'],
		}),
		createStatisticsRecord: builder.mutation({
			query: currencyId => ({
				url: apiUrls.API_URL_CASH_STATISTICS,
				method: 'POST',
				body: { currencyId }
			}),
			invalidatesTags: ['CashStatistics'],
		}),
		removeStatisticsRecord: builder.mutation({
			query: recordId => ({
				url: apiUrls.API_URL_CASH_STATISTICS,
				method: 'DELETE',
				body: { recordId },
			}),
			invalidatesTags: ['CashStatistics'],
		}),
		editStatisticsRecord: builder.mutation({
			query: recordDescription => ({
				url: apiUrls.API_URL_CASH_STATISTICS,
				method: 'PATCH',
				body: recordDescription
			}),
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
			query: baseCurrencyKey => `conversion-rates?base=${baseCurrencyKey}`,
			async onQueryStarted(arg, { dispatch, queryFulfilled, }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setConversionRates(data));
				} catch (err) {
					//TODO something went wrong...
				}
			},
		}),
		getBrokersList: builder.query({
			query: () => apiUrls.API_URL_BROKER,
			providesTags: ['BrokersList'],
		}),
		addBroker: builder.mutation({
			query: (brokerInfo) => ({
				url: apiUrls.API_URL_BROKER,
				method: 'POST',
				body: brokerInfo,
			}),
			invalidatesTags: ['BrokersList'],
		}),
		addBrokerAsset: builder.mutation({
			query: (brokerAssetsInfo) => ({
				url: `${apiUrls.API_URL_BROKER}/assets`,
				method: 'POST',
				body: brokerAssetsInfo,
			}),
			invalidatesTags: ['BrokersList'],
		}),
		getBrokerAssetPrice: builder.query({
			query: request => `${apiUrls.API_URL_BROKER}/assets?base=${request.baseCurrencyKey}&ticker=${request.ticker}`,
		}),
		removeBrokerAsset: builder.mutation({
			query: (brokerAssetsInfo) => ({
				url: `${apiUrls.API_URL_BROKER}/assets`,
				method: 'DELETE',
				body: brokerAssetsInfo,
			}),
			invalidatesTags: ['BrokersList'],
		}),
		editBrokerAsset: builder.mutation({
			query: (brokerAssetsInfo) => ({
				url: `${apiUrls.API_URL_BROKER}/assets`,
				method: 'PATCH',
				body: brokerAssetsInfo,
			}),
			invalidatesTags: ['BrokersList'],
		}),
		editBrokerName: builder.mutation({
			query: brokerInfo => ({
				url: apiUrls.API_URL_BROKER,
				method: 'PATCH',
				body: brokerInfo,
			}),
			invalidatesTags: ['BrokersList'],
		}),
	})
});

export const {
	useGetCashStatisticsQuery,
	useCreateStatisticsRecordMutation,
	useRemoveStatisticsRecordMutation,
	useEditStatisticsRecordMutation,
	useLoginMutation,
	useAddCashCategoryItemMutation,
	useDeleteCashCategoryItemMutation,
	useGetAllCurrenciesQuery,
	useGetConversionRatesQuery,
	useGetCashCategoriesQuery,
	useAddBankOrganizationMutation,
	useGetBanksListQuery,
	useDeleteBankOrganizationMutation,
	useDeleteBankAccountMutation,
	useAddBankAccountMutation,
	useEditBankAccountMutation,
	useGetBrokersListQuery,
	useGetBrokerAssetPriceQuery,
	useAddBrokerMutation,
	useAddBrokerAssetMutation,
	useRemoveBrokerAssetMutation,
	useEditBrokerAssetMutation,
	useEditBrokerNameMutation,
} = api;
