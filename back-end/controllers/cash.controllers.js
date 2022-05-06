const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');
const https = require("https");
const currenciesList = require('../constants/currencies.json')

const addCashCategoryItem = (req, res) => {
    const categoryId = uuidv4()
        
    dbo.getDb()
    .collection('cash_category_items')
    .insertOne({
        _id: categoryId,
        ...req.body/*TODO prevent sql-injection-alike threat*/,
    })
    
    return res.json({_id: categoryId})
}

const deleteCashCategory = (req, res) => {
    dbo.getDb()
    .collection('cash_category_items')
    .deleteOne({_id: { $eq: req.body._id }})
    
    return res.json({_id: req.body._id, type: req.body.type})
}

const getCashStructure = (req, response) => dbo.getDb()
    .collection("cash_category_items")
    .find()
    .toArray((err, result) => {
        const structured = result.reduce((acc, item) => ({
            ...acc,
            [item.type]: acc[item.type] ? [].concat(acc[item.type] , item) : [item]})
            , {})
        
        response.json(structured)
    })

const getCurrenciesList = (req, response) => response.json({list: currenciesList});

const getConversionRates = (req, response) => {
    const conversionRatesCollection = dbo.getDb().collection("conversion_rates")
    const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.FREE_CURRENCY_API_KEY}&base_currency=${req.query.base}`;
    
    return https.get(url, (res) => {
        let data = ''
        res.on('data', (d) => {
            data += d
        });
        
        res.on('end', () => {
            const {meta, data: rates} = JSON.parse(data);
            response.json({
                rates,
                isStale: false,
                timestamp: Date.parse(meta.last_updated_at),
            });
            conversionRatesCollection.replaceOne(
                {},
                {
                    rates: rates,/*TODO prevent sql-injection-alike threat*/
                    isStale: true,
                    timestamp: Date.parse(meta.last_updated_at),
                },
                {
                    upsert: true
                }
            )
            
            console.log('/convert done')
        })
        
    }).on('error', (e) => {
        console.error(e);
        conversionRatesCollection.findOne()
            .then(result => {
                const {_id, ...params} = result
            
                response.json(params);
            }).catch(error => {
            response
                .status(404)
                .json({error})
        })
    });
}

module.exports = {
    addCashCategoryItem,
    getCurrenciesList,
    getConversionRates,
    getCashStructure,
    deleteCashCategory,
}