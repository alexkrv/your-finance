import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

export type BrokerType = {
    _id: string,
    assets: {
        [key: string]: AssetType<ASSET_TYPES>
    },
    avatar: string,
    name: string,
}

export type AssetType<T> = {
    [Property in keyof T]: {
        [key: string]: AssetItemType[]
    }
}

export type AssetItemType = {
    amount: number,
    purchasePricePerUnit: number,
    currentAssetPrice: number,
    purchaseCurrency: string
}