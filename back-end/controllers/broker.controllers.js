const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const dbo = require('../db');
const { retrieveAssetPriceUSD } = require('../utils/get-asset-price');
const { getConversionRatesByBase } = require('../utils/get-conversion-rates');

const getBrokers = (req, response) => dbo.getDb()
	.collection('brokers')
	.find()
	.toArray((err, result) => {
		response.json(result);
	});

const addBroker = (req, res) => {
	const brokerInfo = {
		_id: uuidv4(),
		name: req.body.name/*TODO prevent sql-injection-alike threat*/,
		assets: {
			cash: {},
			funds: {},
			stocks: {},
		}
	};

	return dbo.getDb()
		.collection('brokers')
		.insertOne(brokerInfo)
		.then( () => res.json(brokerInfo));
};

const editBroker = async(req, res) => {
	const brokers = dbo.getDb().collection('brokers');
	const result = await brokers.updateOne(
		{ _id: { $eq: req.body.brokerId } },
		{
			$set: {
				name: req.body.brokerName
			}
		});

	res.json(result);
};

const addBrokerAsset = async(req, res) => {
	const brokers = dbo.getDb().collection('brokers');
	const broker = await brokers.findOne({ _id: { $eq: req.body.brokerId } });

	if(!broker.assets[req.body.type][req.body.name]) {
		broker.assets[req.body.type][req.body.name] = []; // TODO figure out how to do it other way
	}

	broker.assets[req.body.type][req.body.name].push({
		amount: req.body.amount,
		purchasePricePerUnit: req.body.purchasePricePerUnit,
		currentAssetPrice: 0, // TODO delete later as useless. Rather get price by request, not from cache
		purchaseCurrency: req.body.currency,
	});

	const result = await brokers.updateOne(
		{ _id: { $eq: req.body.brokerId } },
		{
			$set: {
				assets: broker.assets // TODO figure out how to do it other way
			}
		});

	res.json(result);
};

const getAssetPriceByTicker = async(req, res) => {
	const { rates } = await getConversionRatesByBase(req.query.base);
	const priceInfo = await retrieveAssetPriceUSD(req.query.ticker, rates, req.query.base);
	const priceValue = priceInfo.currentPrice/(rates['USD'].value || 1);

	res.json({ ...priceInfo, currentPrice: priceValue });
};

const deleteBrokerAsset = async(req, res) => {
	const brokers = dbo.getDb().collection('brokers');
	const broker = await brokers.findOne({ _id: { $eq: req.body.brokerId } });

	delete broker.assets[req.body.type][req.body.name]; // TODO figure out how to do it other way

	const result = await brokers.updateOne(
		{ _id: { $eq: req.body.brokerId } },
		{
			$set: {
				assets: {
					...broker.assets,
				} // TODO figure out how to do it other way
			}
		});

	res.json(result);
};

const editBrokerAsset = async(req, res) => { // TODO create separate handlers or use query params
	const brokers = dbo.getDb().collection('brokers');
	const broker = await brokers.findOne({ _id: { $eq: req.body.brokerId } });
	const amount = broker.assets[req.body.type][req.body.name].reduce((acc, el) => acc + el.amount, 0);
	const currentAssetInfo = broker.assets[req.body.type][req.body.name];

	if(req.body.isBuyMode) {
		currentAssetInfo.push({
			amount: req.body.amount,
			purchasePricePerUnit: req.body.purchasePricePerUnit,
			currentAssetPrice: 0, // TODO delete later as useless. Rather get price by request, not from cache,
			purchaseCurrency: req.body.currency,
		});

		const result = await brokers.updateOne(
			{ _id: { $eq: req.body.brokerId } },
			{
				$set: {
					assets: broker.assets // TODO figure out how to do it other way
				}
			});

		return res.json(result);
	}

	if(amount < req.body.amount) {
		return res.status(400).send('Wrong amount!');
	}

	if(amount === req.body.amount) { // TODO refactor, don't DRY
		delete broker.assets[req.body.type][req.body.name];

		const result = await brokers.updateOne(
			{ _id: { $eq: req.body.brokerId } },
			{
				$set: {
					assets: broker.assets // TODO figure out how to do it other way
				}
			});

		return res.json(result);
	}

	let amountToSell = req.body.amount;

	broker.assets[req.body.type][req.body.name] = currentAssetInfo.map( asset => {
		if(asset.amount < amountToSell) {
			amountToSell -= asset.amount;

			return {
				...asset,
				amount: 0
			};
		} else if(amountToSell === 0){
			return asset;
		} else {
			const processedAsset = {
				...asset,
				amount: asset.amount - amountToSell
			};
			amountToSell = 0;

			return processedAsset;
		}
	}).filter(asset => asset.amount);

	const result = await brokers.updateOne(
		{ _id: { $eq: req.body.brokerId } },
		{
			$set: {
				assets: broker.assets // TODO figure out how to do it other way
			}
		});

	return res.json(result);

};

const addBrokerAvatar = (req, res) => { // TODO share with the same on in bank account
	const bitmap = fs.readFileSync(req.file.path);
	const imageBase64 = `data:image/png;base64, ${Buffer.alloc(bitmap.length, bitmap, ).toString('base64')}`;

	return dbo.getDb()
		.collection('brokers')
		.updateOne(
			{ _id: { $eq: req.query.brokerId } },
			{
				$set: {
					avatar: imageBase64
				}
			}
		).then( () =>
			res.json(imageBase64)
		);
};

module.exports = {
	getBrokers,
	addBroker,
	editBroker,
	addBrokerAsset,
	getAssetPriceByTicker,
	deleteBrokerAsset,
	editBrokerAsset,
	addBrokerAvatar,
};