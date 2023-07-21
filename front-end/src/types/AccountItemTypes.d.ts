export type AccountItemType = {
    bankId: string,
    account: {
        _id: string,
        name: string,
        currencyId: string,
        value: number
    }
};
