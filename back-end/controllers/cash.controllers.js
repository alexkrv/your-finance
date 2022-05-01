const dbo = require('../db')
const { v4: uuidv4 } = require('uuid');

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

module.exports = {
    addCashCategory,
}