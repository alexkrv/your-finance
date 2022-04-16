const dbo = require('../db')

const userLogin = (req, res) => {
    // TODO create real functionality
    dbo.getDb()
        .collection("users")
        .insert({login: req.body.username, password: 'should be secure!'})
    
    return res.json({isAuthenticated: true})
}

module.exports = {
    userLogin,
}