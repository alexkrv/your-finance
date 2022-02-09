import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL_BASE } from '../constants/api-urls';

export const cashStatisticsApi = createApi({
	reducerPath: 'cashStatisticsApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_BASE }),
	tagTypes: ['CashStatistics'],
	endpoints: (builder) => ({
		getCashStatistics: builder.query({
			query: () => 'cash-statistics',
			providesTags: ['CashStatistics'],
		}),
		createStatisticsRecord: builder.mutation({
			query: (currencyId) => `create-statistics-record/${currencyId}`,
			invalidatesTags: ['CashStatistics'],
		}),
	})
});

export const { useGetCashStatisticsQuery, useCreateStatisticsRecordMutation, } = cashStatisticsApi;