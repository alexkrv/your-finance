const dbo = require('../db');

const getConversionRatesByBase = require('./get-conversion-rates');
const retrieveAssetPrice = require('./get-asset-price');

const E_NOT_COUNTED = -1;
const getTotalCash = ({ broker, rates, }) => {
	return Object.keys(broker.assets.cash)
		.reduce((acc, key) =>
			acc + broker.assets.cash[key]
				.reduce((sum, record) => sum + record.amount / (rates[key].value || 1), 0)
		, 0);
};

const getTotalStocks = async ({ broker, rates }) => {
	const stockTickers = Object.keys(broker.assets.stocks);
	const prices = {};

	for(let i = 0; i < stockTickers.length; i++) {
		prices[stockTickers[i]] = await retrieveAssetPrice(stockTickers[i]);
	}

	return Object.keys(broker.assets.stocks).reduce((acc, stockTicker) => {
		return acc + broker.assets.stocks[stockTicker].reduce((sum, record) => {
			return sum + prices[stockTicker]*record.amount/(rates['USD'].value || 1);
		}, 0);
	}, 0);
};

module.exports = {
	getCashCategoriesTotal: async (currencyId) => {
		const { rates } = await getConversionRatesByBase(currencyId);

		if(rates) {
			const cashCategories = await dbo.getDb()
				.collection('cash_category_items')
				.find()
				.toArray();

			return cashCategories.reduce(// TODO unite the contract: currency -> currencyId, sourceValue -> value
				(acc, { currency, sourceValue }) => acc + sourceValue/(rates[currency].value || 1)
				, 0);
		} else {
			return E_NOT_COUNTED;
		}
	},
	getBankAccountsTotal: async (currencyId) => {
		const { rates } = await getConversionRatesByBase(currencyId);

		if(rates) {
			const banks = await dbo.getDb()
				.collection('bank_organizations')
				.find()
				.toArray();
			const allAccounts = banks.reduce((acc, bank) => acc.concat(bank.accounts), []);

			return allAccounts.reduce(
				(acc, { currencyId, value }) => acc + value/(rates[currencyId].value || 1)
				, 0);
		} else {
			return E_NOT_COUNTED;
		}
	},
	getBrokersAssetsTotal: async (currencyId) => {
		const { rates } = await getConversionRatesByBase(currencyId);

		if(rates) {
			const brokers = await dbo.getDb()
				.collection('brokers')
				.find()
				.toArray();
			const brokerKeys = Object.keys(brokers);
			let totalCashSum = 0;
			let totalStocksSum = 0;

			for(let i = 0; i < brokerKeys.length; i++) {
				totalCashSum += getTotalCash({
					broker: brokers[brokerKeys[i]],
					rates
				});

				totalStocksSum += await getTotalStocks({
					broker: brokers[brokerKeys[i]],
					rates
				});

				// TODO deal somehow with Funds
			}

			return totalCashSum + totalStocksSum;
		} else {
			return E_NOT_COUNTED;
		}
	}
};