const { v4: uuidv4 } = require('uuid');

const dbo = require('../db');
const currenciesList = require('../constants/currencies.json');

const addCashCategoryItem = (req, res) => {
	const categoryId = uuidv4();

	dbo.getDb()
		.collection('cash_category_items')
		.insertOne({
			_id: categoryId,
			...req.body/*TODO prevent sql-injection-alike threat*/,
		});

	return res.json({ _id: categoryId });
};

const deleteCashCategory = (req, res) => {
	dbo.getDb()
		.collection('cash_category_items')
		.deleteOne({ _id: { $eq: req.body._id } });

	return res.json({ _id: req.body._id, type: req.body.type });
};

const getCashCategories = (req, response) => dbo.getDb()
	.collection('cash_category_items')
	.find()
	.toArray((err, result) => {
		const structured = result.sort((a , b) => b.sourceValue - a.sourceValue).reduce((acc, item) => ({
			...acc,
			[item.type]: acc[item.type] ? [].concat(acc[item.type] , item) : [item] })
		, {});

		response.json(structured);
	});

const getCurrenciesList = (req, response) => response.json({ list: currenciesList }); // TODO check is it still needed

module.exports = {
	addCashCategoryItem,
	getCurrenciesList,
	getCashCategories,
	deleteCashCategory,
};