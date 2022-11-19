const { v4: uuidv4 } = require('uuid');

const dbo = require('../db');
const { getCashCategoriesTotal, getBankAccountsTotal, getBrokersAssetsTotal } = require('../utils/get-totals');
const getConversionRatesByBase = require('../utils/get-conversion-rates');

const getStatistics = (req, response) => {
	dbo.getDb()
		.collection('statistics_money')
		.find()
		.toArray((err, result) => {
			response.json(result);
		});
};

const addStatisticsRecord = async(req, response) => {
	const { rates } = await getConversionRatesByBase(req.body.currencyId);
	const [ categoriesTotal, accountsTotal, brokersTotal ] = await Promise.allSettled([
		getCashCategoriesTotal(req.body.currencyId, rates),
		getBankAccountsTotal(req.body.currencyId, rates),
		getBrokersAssetsTotal(req.body.currencyId, rates)
	]);
	const value = categoriesTotal.value + accountsTotal.value + brokersTotal.value;
	const recordId = uuidv4();
	const statisticsCollection = dbo.getDb().collection('statistics_money');
	const [lastStatisticsRecord] = await statisticsCollection.find().sort({ _id:1 }).toArray();
	const recordInfo = {
		_id: recordId,
		date: Date.now(),
		value: parseFloat(value.toFixed(2)),
		currencyId: req.body.currencyId,/*TODO prevent sql-injection-alike threat*/
		description: '',
		valueInUsd: parseFloat((value*rates.USD.value).toFixed(2)) || 0,
		difference: lastStatisticsRecord ? parseFloat((lastStatisticsRecord.value*rates[lastStatisticsRecord.currencyId].value)
			.toFixed(2)) || 0 : 0
	};

	statisticsCollection
		.insertOne(recordInfo)
		.then(() => response.json(recordInfo));
};

const editStatisticsRecord = async(req, response) => {
	const statisticsCollection = dbo.getDb().collection('statistics_money');
	const record = await statisticsCollection.findOne({ _id: { $eq: req.body._id } });
	const updatedRecord = {
		...record,
		description: req.body.description
	};

	return statisticsCollection
		.updateOne(
			{ _id: { $eq: req.body._id } },
			{
				$set: updatedRecord
			}
		).then( () =>
			response.json(updatedRecord)
		);
};

const deleteStatisticsRecord = (req, response) => {
	dbo.getDb().collection('statistics_money')
		.deleteOne({ _id: { $eq: req.body.recordId } })
		.then(() => response.json({ _id: req.body.recordId }));
};

module.exports = {
	getStatistics,
	addStatisticsRecord,
	deleteStatisticsRecord,
	editStatisticsRecord
};