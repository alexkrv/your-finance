import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'en-US',
}

export const localizationSlice = createSlice({
    name: 'localization',
    initialState,
    reducers: {
        changeLocalization: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeLocalization } = localizationSlice.actions

export default localizationSlice.reducer