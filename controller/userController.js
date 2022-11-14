const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../../../helper/jwt");


module.exports = class {
    static async getUsers(req, res) {
        try {
            const result = await users.findAll();
            res.status(200).json({
                status:200,
                data: result,
            });

        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getUserById(req, res) {
        const checkUsers = await users.findOne({where: { id: req.params.id} });

        if (!checkUsers){
            res.status(400).send({
                status:400,
                message: "User tidak ditemukan!",

            });
        } else {
            try {
                const result = await users.findAll({
                    where: {id: req.params.id},
                });
                res.status(200).json({
                    status: 200,
                    data:result,
                });

            } catch(err){
                console.log(err);
                res.send(err);
            }
        }
    }

    static async Register(req, res, next){
        const { username, fullname, password, email, institusi_name, confPass } = req.body;

        if(password !== confPass)
            return res.status(400).send({
                message: "password tidak sama",
            });
        
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        try {
            const respone = await users.create({
                username: username,
                fullname: fullname,
                password: password,
                email: email,
                institusi_name: institusi_name,

            });
            res.status(201).send({
                status: 201,
                message: "Sign Up Berhasil",
                data: respone,
            });

        } catch(error) {
            res.status(500).send(error);
        }
    }

    static async Login(req, res, next) {
        try{
            const user = await users.findOne({
                where: {
                    username: req.body.username,
                },
            });

            if (!user) {
                res.status(404).send({
                    status: 404,
                    message: "user not found",
                });
            }
            
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!isValidPassword){
                res.status(404).send({
                    status: 400,
                    message: "username and password not match",
                });
            }

            const token = jwt.generateToken({
                username: user.username,
                password: user.password,
            });

            const UserSecure = user.UserValues;
            delete UserSecure.password;
            res.header("token", token);
            res.status(200).send({
                status: 200,
                message:"Login Berhasil",
                data: {
                    UserSecure,
                    token: token,
                },
            });

        }catch(error){
            res.status(400).send(error);
        }
    }


    static async UpdateUser(req, res){
        const checkUsers = await users.findOne({ where: {id: req.params.id} });

        if(!checkUsers){
            res.status(400).send({
                status: 400,
                message: "User Not Found",
            });

        }else {
                try{
                    const result = await users.Update(
                        {
                            username: req.body.username,
                            fullname: req.body.fullname,
                            institusi_name: req.body.institusi_name,

                        },
                        {where: {id: req.userlogin.id}}
                    );

                    res
                        .status(201)
                        .json({
                            status: 201,
                            message: "Data berhasil diubah",
                            data: this.UpdateUser,
                        })
                        .end();

                }catch (err){
                    console.log(err);
                    res.send(err);
                }
        }
    }

};