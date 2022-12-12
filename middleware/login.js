const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.header('token')

    if(!token) {return res.status(401).send('Lakukan login terlebih dahulu')}

    try{
        next()
    } catch(err){
        res.status(400).send('invalid token')
    }
}

module.exports = {auth}