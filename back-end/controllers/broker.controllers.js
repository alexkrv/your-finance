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
        assets: {
            cash: {},
            funds: {},
            stocks: {},
        }
    }
    
    return dbo.getDb()
        .collection('brokers')
        .insertOne(brokerInfo)
        .then( () => res.json(brokerInfo))
}

const addBrokerAsset = async(req, res) => {
    const brokers = dbo.getDb().collection('brokers')
    const broker = await brokers.findOne({ _id: { $eq: req.body.brokerId} })
    
    if(!broker.assets[req.body.type][req.body.name]) {
        broker.assets[req.body.type][req.body.name] = [] // TODO figure out how to do it other way
    }
    
    broker.assets[req.body.type][req.body.name].push({
        amount: req.body.amount,
        purchasePricePerUnit: req.body.purchasePricePerUnit,
        currentAssetPrice: req.body.purchasePricePerUnit, // TODO use api about asset current price
        purchaseCurrency: req.body.currency,
    })
    
    const result = await brokers.updateOne(
        { _id: { $eq: req.body.brokerId} },
        {
            $set: {
                assets: broker.assets // TODO figure out how to do it other way
            }
        })
    
    res.json(result)
}

const deleteBrokerAsset = async(req, res) => {
    const brokers = dbo.getDb().collection('brokers')
    const broker = await brokers.findOne({ _id: { $eq: req.body.brokerId} })
    
    delete broker.assets[req.body.type][req.body.name] // TODO figure out how to do it other way
    
    const result = await brokers.updateOne(
        { _id: { $eq: req.body.brokerId} },
        {
            $set: {
                assets: {
                    ...broker.assets,
                } // TODO figure out how to do it other way
            }
        })
    
    res.json(result);
}

module.exports = {
    getBrokers,
    addBroker,
    addBrokerAsset,
    deleteBrokerAsset,
}