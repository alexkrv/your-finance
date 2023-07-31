const https = require('https');
const http = require('http');

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
						ticker,
						exchange: MOSCOW_EXCHANGE,
						currencyId: 'RUB',
						currentPrice: parseFloat(price) || 0
					});
				} else {
					console.log(`${ticker} price is 0 (MOEX)`);
					resolve({
						ticker,
						exchange: MOSCOW_EXCHANGE,
						currencyId: 'RUB',
						currentPrice: 0
					});
				}
			});
		};
		const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}.json`;

		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error); // TODO correct reject result
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
					ticker,
					exchange: info.quoteSummary?.result[0]?.price?.exchangeName,
					currencyId: info.quoteSummary?.result[0]?.price?.currency,
					currentPrice: price
				});
			});
		};

		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error); // TODO correct reject result
			});
	});
};

const marketStackTickerLastPrice = tickers => {
	// `http` because of free plan on marketstack
	const url = `http://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKET_STACK_API_KEY}&symbols=${tickers.join(',')}`;

	return new Promise((resolve) => {
		const responseHandler = (res) => {
			const { statusCode, headers } = res;
			const contentType = headers['content-type'];

			let error;
			// Any 2xx status code signals a successful response but
			// here we're only checking for 200.

			if (statusCode !== 200) {
				error = new Error(`Request Failed.\n Status Code: ${statusCode}`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error(`Invalid content-type.\n Expected application/json but received ${contentType}`);
			}

			if (error) {
				console.error(error.message);
				// Consume response data to free up memory
				res.resume();

				resolve({
					ticker: tickers[0],
					exchange: '',
					currencyId: 'USD',
					currentPrice: 0
				});
			}

			let rawData = '';
			res.setEncoding('utf8');
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					console.log(`RESOLVE: ${tickers[0]} ${parsedData.data?.[0].exchange} ${parsedData.data?.[0].last}`);
					resolve({
						ticker: tickers[0],
						exchange: parsedData.data?.[0].exchange || '',
						currencyId: 'USD',
						currentPrice: parseFloat(parsedData.data?.[0].last) || 0
					});
				} catch (e) {
					console.error(e.message);
					resolve({
						ticker: tickers[0],
						exchange: '',
						currencyId: 'USD',
						currentPrice: 0
					});
				}
			});
		};

		http.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				resolve({
					ticker: tickers[0],
					exchange: '',
					currencyId: 'USD',
					currentPrice: 0
				});
			});
	});
};

const retrieveAssetPrice = async (assetSymbol) => {
	const moexTickerPricePromise = moexTickerLast(assetSymbol);
	const marketStackTickerPricePromise = marketStackTickerLastPrice([assetSymbol]);

	const [moexTickerPrice, marketStackTickerPrice] = await Promise.allSettled([moexTickerPricePromise, marketStackTickerPricePromise]);

	if(moexTickerPrice.value.currentPrice) {
		return moexTickerPrice.value;
	} else if(marketStackTickerPrice.value.currentPrice) {
		return marketStackTickerPrice.value;
	} else {
		return { ticker: assetSymbol, exchange: null, currencyId: null, currentPrice: 0 };
	}

};

module.exports = {
	retrieveAssetPriceUSD: async (assetSymbol, rates, baseCurrencyId) => {
		const priceInfo = await retrieveAssetPrice(assetSymbol);

		if (priceInfo.currencyId === 'USD') {
			return priceInfo;
		} else {
			const price = baseCurrencyId === 'USD'
				? priceInfo.currentPrice / (rates['RUB'].value || 1)
				: (priceInfo.currentPrice / (rates['RUB'].value || 1)) * (rates['USD'].value || 1);

			return { ...priceInfo, currentPrice: price };
		}
	}
};

