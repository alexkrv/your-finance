export type ConversionRatesType = {
    baseCurrencyKey: string,
    isStale: boolean,
    rates: {
        [key: string]: CurrencyConversionRate[]
    },
    timestamp: number,
    _id: string
}

export type CurrencyConversionRate = {
    [key: string]: {
        code: string,
        value: number
    }
}

