import { v4 as uuidv4 } from 'uuid';

const statistics = {
	'123-456-789': {
		name: 'Tinkoff Bank',
		id: '123-456-789',
		accounts: [
			{ name: 'Tinkoff Black', currencyId: 'RUB', value: 12345, id: uuidv4() },
			{ name: 'Tinkoff Black USD', currencyId: 'USD', value: 12345, id: uuidv4() },
			{ name: 'Tinkoff Black EUR', currencyId: 'EUR', value: 12345, id: uuidv4() },
		]
	} };

export default statistics;