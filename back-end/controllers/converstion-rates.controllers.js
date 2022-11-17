const getConversionRatesByBase = require('../utils/get-conversion-rates')

const getConversionRates = async (req, response) => {
	const ratesInfo = await getConversionRatesByBase(req.query.base)

	response.json(ratesInfo);
}

module.exports = {
	getConversionRates,
}