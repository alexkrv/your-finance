export type BrokerType = {
    _id: string,
    assets: {
        [key: string]: AssetType
    },
    avatar: string,
    name: string,
}

export type AssetType = {
    cash: {
        [key: string]: AssetItemType[]
    },
    stocks: {
        [key: string]: AssetItemType[]
    },
    funds: {
        [key: string]: AssetItemType[]
    },
}

export type AssetItemType = {
    amount: number,
    purchasePricePerUnit: number,
    currentAssetPrice: number,
    purchaseCurrency: string
}