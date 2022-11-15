const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');

const getStatistics = (req, response) => {
	dbo.getDb()
		.collection('statistics_money')
		.find()
		.toArray((err, result) => {
			response.json(result)
		})
}

const addStatisticsRecord = (req, response) => {
	// const bankCollection = dbo.getDb()
	// 	.collection('bank_organizations')
	// 	.find()
	// 	.toArray((err, result) => {
	// 		//TODO agregate all bank accounts
	// 	})
	const recordId = uuidv4()
	const recordInfo = {
		_id: recordId,
		date: Date.now(),
		value: 1234567, // TODO count amount
		currencyId: req.body.currencyId,/*TODO prevent sql-injection-alike threat*/
		description: '',
		difference: 0, // TODO for difference extract last record and fill `difference` filed with value
	}
	
	dbo.getDb()
		.collection('statistics_money')
		.insertOne(recordInfo)
		.then(() => response.json(recordInfo))
}

module.exports = {
	getStatistics,
	addStatisticsRecord
}