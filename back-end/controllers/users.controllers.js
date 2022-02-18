const passport = require('passport');
const LocalStrategy = require('passport-local');
const dbo = require('../db')

const userLogin = async (req, res) => {
    // TODO create real functionality
    dbo.getDb()
        .collection("users")
        .insert({login: req.body.username, password: 'should be secure!'})
    
    return res.status(200)
}

module.exports = {
    userLogin,
}