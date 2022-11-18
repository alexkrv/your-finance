const https = require('https');

const dbo = require('../db');

const getActualConversionRatesByBase = baseCurrencyId => {
	const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.FREE_CURRENCY_API_KEY}&base_currency=${baseCurrencyId}`;

	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				const { meta, data: rates } = JSON.parse(data);

				if(rates) {
					resolve({ meta, rates });
				} else {
					reject();
				}
			});

		}).on('error', error => {
			console.error(error);
			reject();
		});
	});
};

const getConversionRatesByBaseWithUpdate = async (conversionRatesCollection, baseCurrencyId) => {
	const ratesInfo = await getActualConversionRatesByBase(baseCurrencyId);
	const preparedInfo = {
		baseCurrencyKey: baseCurrencyId,
		rates: ratesInfo.rates,/*TODO prevent sql-injection-alike threat*/
		isStale: true,
		timestamp: Date.parse(ratesInfo.meta.last_updated_at),
	};
	await conversionRatesCollection.replaceOne(
		{ baseCurrencyKey: { $eq: baseCurrencyId } },
		preparedInfo,
		{
			upsert: true
		}
	);

	return preparedInfo;
};

module.exports = getConversionRatesByBase = baseCurrencyId => {
	const conversionRatesCollection = dbo.getDb().collection('conversion_rates');

	if (process.env.NODE_ENV === 'development') {
		return new Promise((resolve, reject) => {
			conversionRatesCollection
				.findOne({ baseCurrencyKey: { $eq: baseCurrencyId } },)
				.then(async result => {
					if(result) {
						resolve(result);
					} else {
						resolve(await getConversionRatesByBaseWithUpdate(conversionRatesCollection, baseCurrencyId));
					}
				});
		});
	} else {
		return getConversionRatesByBaseWithUpdate(conversionRatesCollection, baseCurrencyId);
	}
};