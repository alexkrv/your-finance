const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const addBankOrganization = (req, res) => {
    const bankId = uuidv4()
    const bankInfo = {
        _id: bankId,
        name: req.body.name/*TODO prevent sql-injection-alike threat*/,
        accounts: []
    }
    
    return dbo.getDb()
        .collection('bank_organizations')
        .insertOne(bankInfo)
        .then( () => res.json(bankInfo))
}

const addBankAccount = (req, res) => {
    const accountId = uuidv4()
    const accountInfo = {
        _id: accountId,
        name: req.body.account.name/*TODO prevent sql-injection-alike threat*/,
        currencyId: req.body.account.currencyId,
        value: req.body.account.value,
    }
    
    return dbo.getDb()
        .collection('bank_organizations')
        .updateOne(
            {_id: { $eq: req.body.bankId}},
            {
                $push: {
                    accounts: accountInfo
                }
            }
        ).then( () =>
            res.json(accountInfo)
        )
}

const addBankOrganizationAvatar = (req, res) => {
    const bitmap = fs.readFileSync(req.file.path)
    const imageBase64 = `data:image/png;base64, ${Buffer.alloc(bitmap.length, bitmap, ).toString('base64')}`
    
    return dbo.getDb()
        .collection('bank_organizations')
        .updateOne(
            {_id: { $eq: req.query.bankId}},
            {
                $set: {
                    avatar: imageBase64
                }
            }
        ).then( () =>
            res.json(imageBase64)
        )
}

const deleteBankAccount = (req, res) => {
    const accountInfo = {
        accountId: req.body.accountId,
        bankId: req.body.bankId,
    }
    
    return dbo.getDb()
        .collection('bank_organizations')
        .updateOne(
            {_id: { $eq: req.body.bankId}},
            {
                $pull: {
                    accounts: {_id: { $eq: req.body.accountId}}
                }
            }
        ).then( () =>
            res.json(accountInfo)
        )
}

const deleteBankOrganization = (req, res) => dbo.getDb()
    .collection('bank_organizations')
    .deleteOne({_id: { $eq: req.body.bankId }})
    .then( () => res.json({_id: req.body.bankId}))

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
    addBankAccount,
    deleteBankAccount,
    addBankOrganizationAvatar,
}