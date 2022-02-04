import { createSlice } from '@reduxjs/toolkit';
import statistics from 'mocks/mockDataCashStatistics';

const initialState = {
	statistics: []
};

export const pageCashStructureStatistics = createSlice({
	name: 'cashStatistics',
	initialState,
	reducers: {
		getStatistics: (state, action) => {
			state.statistics = statistics;
		},
	}
});

export const {
	getStatistics
} = pageCashStructureStatistics.actions;

export default pageCashStructureStatistics.reducer;