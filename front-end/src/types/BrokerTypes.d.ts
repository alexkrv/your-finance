import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

export type BrokerType = {
    _id: string,
    assets: {
        [key: string]: AssetType<ASSET_TYPES.CASH | ASSET_TYPES.FUNDS | ASSET_TYPES.STOCKS>
    },
    avatar: string,
    name: string,
}

export type AssetType<T> = {
    [T]: {
        [key: string]: AssetItemType[]
    }
}

export type AssetItemType = {
    amount: number,
    purchasePricePerUnit: number,
    currentAssetPrice: number,
    purchaseCurrency: string
}