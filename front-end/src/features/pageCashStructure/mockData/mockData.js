import { v4 as uuidv4 } from 'uuid';

export const getMockBankList = () => {
	const bankId = uuidv4();

	return {
		[bankId]: {
			name: 'Tinkoff Bank',
			id: bankId,
			accounts: [
				{ name: 'Tinkoff Black', currencyId: 'RUB', value: 12345, id: uuidv4() },
				{ name: 'Tinkoff Black USD', currencyId: 'USD', value: 12345, id: uuidv4() },
				{ name: 'Tinkoff Black EUR', currencyId: 'EUR', value: 12345, id: uuidv4() },
			]
		} };
};