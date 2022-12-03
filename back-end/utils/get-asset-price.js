const https = require('https');

const { MOSCOW_EXCHANGE, LONDON_EXCHANGE } = require('../constants/common');

const moexTickerLast = async ticker => {
	return new Promise((resolve, reject) => {
		const responseHandler = (res) => {
			let data = '';
			res.on('data', (d) => {
				data += d;
			});

			res.on('end', () => {
				const info = JSON.parse(data);

				if(info.marketdata.data.length){
					const [targetData] = info.marketdata.data.filter(result => {
						return ['TQBR', 'TQTF'].includes(result[1]);
					});

					const price = targetData[12] || targetData[24]; // TODO refactor

					console.log(`${ticker} price is ${price} (MOEX)`);
					resolve({
						exchange: MOSCOW_EXCHANGE,
						currencyId: 'RUB',
						value: parseFloat(price) || 0
					});
				} else {
					console.log(`${ticker} price is 0 (MOEX)`);
					resolve(0);
				}
			});
		};
		const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}.json`;

		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error);
			});
	});
};

const alphavantageTickerPrice = ticker => {
	const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.FREE_ALPHAVANTAGE_API_KEY}`;

	return new Promise((resolve, reject) => {
		const responseHandler = (res) => {
			let data = '';
			res.on('data', (d) => {
				data += d;
			});

			res.on('end', async() => {
				if(data.includes('Our standard API call frequency is 5 calls per minute and 500 per day')) {
					console.log(`${ticker} Alpha Vantage: no more request (standard API call frequency is 5 calls per minute)`);

					return resolve(0);
				}

				const info = JSON.parse(data);
				const price = parseFloat(info['Global Quote']?.['05. price']) || 0;

				console.log(`${ticker} price is ${price} (LSE)`);
				resolve({
					exchange: LONDON_EXCHANGE,
					currencyId: 'USD',
					value: price
				});
			});
		};

		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error);
			});
	});
};

const yahooFinanceTickerPrice = ticker => {
	const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price`;

	return new Promise((resolve, reject) => {
		const responseHandler = (res) => {
			let data = '';
			res.on('data', (d) => {
				data += d;
			});

			res.on('end', async() => {
				const info = JSON.parse(data);

				if(info.quoteSummary?.result === null) {
					return resolve(0);
				}

				const price = parseFloat(info.quoteSummary?.result[0]?.price?.regularMarketPrice?.raw) || 0;

				console.log(`${ticker} price is ${price} (${info.quoteSummary?.result[0]?.price?.exchangeName})`);
				resolve({
					exchange: info.quoteSummary?.result[0]?.price?.exchangeName,
					currencyId: info.quoteSummary?.result[0]?.price?.currency,
					value: price
				});
			});
		};

		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error);
			});
	});
};

const retrieveAssetPrice = async (assetSymbol) => {
	const moexTickerPricePromise = moexTickerLast(assetSymbol);
	const yahooTickerPricePromise = yahooFinanceTickerPrice(assetSymbol);

	const [moexTickerPrice, yahooTickerPrice] = await Promise.allSettled([moexTickerPricePromise, yahooTickerPricePromise]);

	return moexTickerPrice.value || yahooTickerPrice.value || { exchange: null, currencyId: null, value: 0 };
};

module.exports = {
	retrieveAssetPriceUSD: async (assetSymbol, rates, baseCurrencyId) => {
		const priceInfo = await retrieveAssetPrice(assetSymbol);

		if (priceInfo.currencyId === 'USD') {
			return priceInfo.value;
		} else {
			return baseCurrencyId === 'USD'
				? priceInfo.value / (rates['RUB'].value || 1)
				: (priceInfo.value / (rates['RUB'].value || 1)) * (rates['USD'].value || 1);
		}
	}
};

