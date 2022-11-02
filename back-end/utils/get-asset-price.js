const https = require('https');

module.exports = retrieveAssetPrice = assetSymbol => {
	const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${assetSymbol}&apikey=${process.env.FREE_ALPHAVANTAGE_API_KEY}`;

	return new Promise((resolve, reject) => {
		const responseHandler = (res) => {
			let data = ''
			res.on('data', (d) => {
				data += d
			});
			
			res.on('end', () => {
				const info = JSON.parse(data);
				
				console.log(`${assetSymbol} price is ${info["Global Quote"]?.["05. price"] || 0}`)
				resolve(parseFloat(info["Global Quote"]?.["05. price"]) || 0)
			})
		}
		
		https.get(url, responseHandler)
			.on('error', error => {
				console.error(error);
				reject(error)
			});
	})
}

