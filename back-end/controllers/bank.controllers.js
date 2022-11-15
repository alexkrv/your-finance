const dbo = require('../db');
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

const editBankAccount = async(req, res) => {
	const bankCollection = dbo.getDb().collection('bank_organizations')
	const bank = await bankCollection.findOne({ _id: { $eq: req.body.bankId } })
	const updatedAccountsInfo = bank.accounts.map(el => {
		if(el._id === req.body.accountId){
			return {
				...el,
				name: req.body.accountName/*TODO prevent sql-injection-alike threat*/,
				value: req.body.accountValue/*TODO prevent sql-injection-alike threat*/
			}
		} else {
			return el
		}
	})

	return bankCollection
		.updateOne(
			{_id: { $eq: req.body.bankId}},
			{
				$set: {
					accounts: updatedAccountsInfo
				}
			}
		).then( () =>
			res.json(updatedAccountsInfo)
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
	editBankAccount,
    deleteBankAccount,
    addBankOrganizationAvatar,
}