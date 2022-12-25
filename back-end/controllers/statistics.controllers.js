const { v4: uuidv4 } = require('uuid');

const dbo = require('../db');
const { getBankAccountsTotal, getBrokersAssetsTotal } = require('../utils/get-totals');
const { getConversionRatesByBase } = require('../utils/get-conversion-rates');

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
	const [ accountsTotal, brokersTotal ] = await Promise.allSettled([
		getBankAccountsTotal(req.body.currencyId, rates),
		getBrokersAssetsTotal(req.body.currencyId, rates)
	]);
	const value = accountsTotal.value + brokersTotal.value;
	const recordId = uuidv4();
	const statisticsCollection = dbo.getDb().collection('statistics_money');
	const [lastStatisticsRecord] = await statisticsCollection.find().sort({ date: -1 }).toArray();
	const previousValue = lastStatisticsRecord
		? lastStatisticsRecord.value/rates[lastStatisticsRecord.currencyId].value || 0
		: 0;
	const recordInfo = {
		_id: recordId,
		date: Date.now(),
		currencyId: req.body.currencyId,/*TODO prevent sql-injection-alike threat*/
		description: '',
		value, // TODO refactor as duplication
		valueInUsd: value*rates.USD.value || 0, // TODO refactor as duplication
		valueInRub: value*rates.RUB.value || 0, // TODO refactor as duplication
		difference: previousValue ? value - previousValue : 0, // TODO refactor as duplication
		total: {
			valueInBaseCurrency: value,
			valueInUsd: value*rates.USD.value || 0,
			valueInRub: value*rates.RUB.value || 0,
			difference: previousValue ? value - previousValue : 0,
		},
		structure: {
			accounts: {
				total: accountsTotal.value,
				// TODO each currency total
			},
			brokers: {
				total: brokersTotal.value,
				// TODO each asset total
			}
		}
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