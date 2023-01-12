const dbo = require('../db');

const { retrieveAssetPriceUSD } = require('./get-asset-price');
const E_NOT_COUNTED = -1;

const getTotalsCashInBase = ({ broker, rates, }) => {
	return Object.keys(broker.assets.cash)
		.reduce((acc, key) => {
			if(acc[key]){
				acc[key] += broker.assets.cash[key]
					.reduce((sum, record) => sum + record.amount / (rates[key].value || 1), 0);

				return acc;
			} else {
				acc[key] = broker.assets.cash[key]
					.reduce((sum, record) => sum + record.amount / (rates[key].value || 1), 0);

				return acc;
			}

		}, {});
};

const getTotalStocks = async ({ broker, rates, baseCurrencyId }) => {
	const stockTickers = Object.keys(broker.assets.stocks);
	const prices = {};

	for(let i = 0; i < stockTickers.length; i++) {
		prices[stockTickers[i]] = (await retrieveAssetPriceUSD(stockTickers[i], rates, baseCurrencyId)).currentPrice;
	}

	return Object.keys(broker.assets.stocks).reduce((acc, stockTicker) => {
		return acc + broker.assets.stocks[stockTicker].reduce((sum, record) => {
			return sum + prices[stockTicker]*record.amount/(rates['USD'].value || 1);
		}, 0);
	}, 0);
};

const getTotalFunds = async ({ broker, rates, baseCurrencyId }) => {
	const fundTickers = Object.keys(broker.assets.funds);
	const prices = {};

	for(let i = 0; i < fundTickers.length; i++) {
		prices[fundTickers[i]] = (await retrieveAssetPriceUSD(fundTickers[i], rates, baseCurrencyId)).currentPrice;
	}

	return Object.keys(broker.assets.funds).reduce((acc, fundTicker) => {
		return acc + broker.assets.funds[fundTicker].reduce((sum, record) => {
			return sum + prices[fundTicker]*record.amount/(rates['USD'].value || 1);
		}, 0);
	}, 0);
};

module.exports = {
	getCashCategoriesTotal: async (currencyId, rates) => {
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
	getBankAccountsTotal: async (currencyId, rates) => {
		if(rates) {
			const banks = await dbo.getDb()
				.collection('bank_organizations')
				.find()
				.toArray();
			const allAccounts = banks.reduce((acc, bank) => acc.concat(bank.accounts), []);
			const allCurrenciesTotals = allAccounts.reduce((acc, account) => {
				if(acc[account.currencyId]) {
					acc[account.currencyId] += account.value/(rates[account.currencyId].value || 1);
				} else {
					acc[account.currencyId] = account.value/(rates[account.currencyId].value || 1);
				}

				return acc;
			}, {});

			 const totalInBaseCurrency = allAccounts.reduce(
				(acc, { currencyId, value }) => acc + value/(rates[currencyId].value || 1)
				, 0);

			 return {
				 totalInBaseCurrency,
				 allCurrenciesTotals
			 };
		} else {
			return E_NOT_COUNTED;
		}
	},
	getBrokersAssetsTotal: async (currencyId, rates) => {
		if(rates) {
			const brokers = await dbo.getDb()
				.collection('brokers')
				.find()
				.toArray();
			let totalCashByCurrency = {};
			let totalStocksSum = 0;
			let totalFundsSum = 0;
			let current = undefined;

			for(let i = 0; i < brokers.length; i++) {
				current = getTotalsCashInBase({
					broker: brokers[i],
					rates,
				});

				if(Object.keys(current).length) {
					Object.keys(current).forEach(currencyKey => {
						if(totalCashByCurrency[currencyKey]) {
							totalCashByCurrency[currencyKey] += current[currencyKey];
						} else {
							totalCashByCurrency[currencyKey] = current[currencyKey];
						}
					});
				}

				totalStocksSum += await getTotalStocks({
					broker: brokers[i],
					rates,
					baseCurrencyId: currencyId
				});

				totalFundsSum += await getTotalFunds({
					broker: brokers[i],
					rates,
					baseCurrencyId: currencyId
				});
			}

			const sumAllBrokersCashInBase = brokersCurrencies =>
				Object.keys(brokersCurrencies)
					.reduce((acc, brokerCurrency) => acc + brokersCurrencies[brokerCurrency]
						, 0);
			const totalCashSum = sumAllBrokersCashInBase(totalCashByCurrency);

			return {
				totalInBaseCurrency: totalStocksSum + totalFundsSum + totalCashSum,
				allAssetsTotals: {
					stocks: totalStocksSum,
					funds: totalFundsSum,
					...totalCashByCurrency
				}
			};
		} else {
			return E_NOT_COUNTED;
		}
	},
	mergeTotals: (...args) => args.reduce((acc,total) => {
		Object.keys(total).forEach(assetName => {
			if(acc[assetName]) {
				acc[assetName] += total[assetName];
			} else {
				acc[assetName] = total[assetName];
			}
		});

		return acc;
	}, {})
};