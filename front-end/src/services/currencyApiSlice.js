import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_BASE } from '../constants/api-urls';

export const currencyApi = createApi({
	reducerPath: 'currencyApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_BASE }),
	endpoints: (builder) => ({
		getAllCurrencies: builder.query({
			transformResponse: (response, meta, arg) =>
				JSON.parse(response)?.results,
			query: (name) => 'currencies',
		})
	})
});

export const { useGetAllCurrenciesQuery, getAllCurrencies, } = currencyApi;