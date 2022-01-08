import { configureStore } from '@reduxjs/toolkit'

import localizationReducer from '../features/localization/localizationSlice'

export const store = configureStore({
    reducer: {
        localization: localizationReducer
    },
})