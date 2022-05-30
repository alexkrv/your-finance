const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');

const getBrokers = (req, response) => dbo.getDb()
    .collection("brokers")
    .find()
    .toArray((err, result) => {
        response.json(result)
    })

const addBroker = (req, res) => {
    const brokerId = uuidv4()
    const brokerInfo = {
        _id: brokerId,
        name: req.body.name/*TODO prevent sql-injection-alike threat*/,
        assets: {
            cash: [],
            funds: [],
            stocks: [],
            other: []
        }
    }
    
    return dbo.getDb()
        .collection('brokers')
        .insertOne(brokerInfo)
        .then( () => res.json(brokerInfo))
}

module.exports = {
    getBrokers,
    addBroker,
}