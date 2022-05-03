const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');
const https = require("https");

const addCashCategory = (req, res) => {
    const categoryId = uuidv4()
        
    dbo.getDb()
    .collection("cash")
    .insertOne({
        _id: categoryId,
        ...req.body/*TODO prevent sql-injection-alike threat*/,
    })
    
    return res.json({id: categoryId})
}

const getCurrenciesList = (req, response) => {
    const url = `https://openexchangerates.org/api/currencies.json`;
    const currenciesCollection = dbo.getDb().collection("currencies")

    return https.get(url, (res) => {
        let data = ''
        res.on('data', (d) => {
            data += d
        });
    
        res.on('end', () => {
            response.json({
                list: JSON.parse(data),
                isStale: false,
                timestamp: Date.now()}
            );
            
            currenciesCollection.replaceOne(
                    {},
                    {
                        list: JSON.parse(data),/*TODO prevent sql-injection-alike threat*/
                        isStale: true,
                        timestamp: Date.now(),
                    },
                    {
                        upsert: true
                    }
                )
            
            console.log('/currencies done')
        })
    
    }).on('error', (e) => {
        console.error(e);
        currenciesCollection.findOne()
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
    addCashCategory,
    getCurrenciesList,
    getConversionRates,
}