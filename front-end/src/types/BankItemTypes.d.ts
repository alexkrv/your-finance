export type Account = {
    name: string,
    currencyId: string,
    value: number,
    _id: string
}

export type BankItemType = {
    name: string,
    _id: string,
    accounts: Account[],
    avatar: string,
}