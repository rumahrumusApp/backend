const jwt = require("../helper/jwt");
const { users }= require("../models");

module.exports = async (req, res, next) => {
    try{
        const payload = jwt.verifyToken(req.headers.token);
        if (!payload){
            res.status(404).send({ message: "user tidak ditemukan"});
        }

        const user = await users.findOne({
            where: { username: payload.username, password: payload.password},
        });

        if (!user) {
            res.status(404).send({message:"user tidak ditemukan"});
        }else {
            req.userlogin = user.dataValues;
            next();
        }
    } catch (err) {
        res.status(500).send(err);
    }
};