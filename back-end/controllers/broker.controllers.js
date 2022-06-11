const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');

const getBrokers = (req, response) => dbo.getDb()
    .collection("brokers")
    .find()
    .toArray((err, result) => {
        response.json(result)
    })

const addBroker = (req, res) => {
    const brokerInfo = {
        _id: uuidv4(),
        name: req.body.name/*TODO prevent sql-injection-alike threat*/,
        cash: [
            {_id: 'RUB', amount: 1000},
            {_id: 'USD', amount: 1000},
        ],
        funds: [
            {_id: 'ETF', amount: 1},
            {_id: 'ETF', amount: 2},
        ],
        stocks: [
            {_id: 'APPH', amount: 1},
        ]
    }
    
    return dbo.getDb()
        .collection('brokers')
        .insertOne(brokerInfo)
        .then( () => res.json(brokerInfo))
}

const addBrokerAsset = async(req, res) => {
    const brokers = dbo.getDb().collection('brokers')
    const assetInfo = {
        _id: req.body.name,
        amount: req.body.amount,
    }
    const test = await brokers.findOne({ _id: { $eq: req.body.brokerId} })
    const updated = test[req.body.type].filter(asset => asset._id !== req.body.name)
    
    updated.push(assetInfo)
    
    const result = await brokers.updateOne(
        { _id: { $eq: req.body.brokerId} },
        {
            $set: {[req.body.type]: updated} // TODO figure out how to do it other way
        })
    
    res.json(result)
}

module.exports = {
    getBrokers,
    addBroker,
    addBrokerAsset,
}