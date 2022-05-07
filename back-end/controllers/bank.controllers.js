const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');

const addBankOrganization = (req, res) => {
    const bankId = uuidv4()
    const bankInfo = {
        _id: bankId,
        name: req.body.name/*TODO prevent sql-injection-alike threat*/,
        accounts: []
    }
    dbo.getDb()
        .collection('bank_organizations')
        .insertOne(bankInfo)
    
    return res.json(bankInfo)
}

const deleteBankOrganization = (req, res) => {
    dbo.getDb()
        .collection('bank_organizations')
        .deleteOne({_id: { $eq: req.body.bankId }})
    
    return res.json({_id: req.body.bankId})
}

const getBanksList = (req, response) => dbo.getDb()
    .collection("bank_organizations")
    .find()
    .toArray((err, result) => {
        response.json(result)
    })

module.exports = {
    addBankOrganization,
    getBanksList,
    deleteBankOrganization,
}