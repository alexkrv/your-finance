const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');
const https = require("https")

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
            currenciesCollection.replaceOne(
                    {},
                    {
                        list: JSON.parse(data),/*TODO prevent sql-injection-alike threat*/
                        timestamp: Date.now(),
                    },
                    {
                        upsert: true
                    }
                )
        
            response.json({
                list: JSON.parse(data),
                isStale: false,
                timestamp: Date.now()}
            );
            console.log('/currencies done')
        })
    
    }).on('error', (e) => {
        console.error(e);
        currenciesCollection.findOne()
            .then(result => {
                const {_id, ...params} = result
                
                response.json({
                    ...params,
                    isStale: true
                });
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
}