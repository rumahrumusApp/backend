const { users, role } = require("../models");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("../helper/jwt");
const cloudinary = require("../utils/cloudinary");
const { promisify } = require("util");
const cloudyUpload = promisify(cloudinary.uploader.upload);
const cloudyDelete = promisify(cloudinary.uploader.destroy);

// const multer = require('multer')
// const path = require('path')
// import multer from 'multer'

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

    static async getUserProfile(req, res) {
        
        const checkUsers = await users.findOne({where: { id: req.params.id} });

        if (!checkUsers){
            res.status(400).send({
                status:400,
                message: "User tidak ditemukan!",

            });
        } else {
            try {
                
                const result = await users.findOne({
                    include: [
                       
                        'roles',
                        'occupation',
                     
        
                   ], where: {id: req.params.id},});

                res.status(200).json({
                    status: 200,
                    data: result,
                });

            } catch(err){
                console.log(err);
                res.send(err);
            }
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
        const { username, fullname,img_profile, role, occupation_id, password, reviewer_id,email, institusi_name, confPass, enable } = req.body;

        if(password !== confPass)
            return res.status(400).send({
                message: "password tidak sama",
            });
        
        else {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
        try {
            const respone = await users.create({
                username: username,
                fullname: fullname,
                img_profile: null,
                role: 1,
                occupation_id: occupation_id,
                password: hashPassword,
                email: email,
                institusi_name: null,
                reviewer_id: null,
                enable: true
               

            });
            res.status(201).send({
                status: 201,
                message: "Sign Up Berhasil",
                data: respone,
            });

            // res.send({
            //     salt,
            //     hashPassword
            // })

        } catch(error) {
            res.status(500).send(error);
        }
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

            // const token = jwt.generateToken({
            //     username: user.username,
            //     password: user.password,
            // });

            // const UserSecure = user.UserValues;
            // delete UserSecure.password;
            // res.header("token", token);
            res.status(200).send({
                status: 200,
                message:"Login Berhasil",
                data: user
                // data: {
                //     UserSecure,
                //     token: token,
                // },
            });

        }catch(error){
            res.status(400).send(error);
        }
    }


    static async UpdateUser(req, res){
        // const storage = multer.diskStorage
        const { username, fullname, img_profile, occupation_id, institusi_name } = req.body;
        const checkUsers = await users.findOne({ where: {id: req.params.id} });
       

        if(!checkUsers){
            res.status(400).send({
                status: 400,
                message: "User Not Found",
            });

        }else {
                
                try{

                    // console.log(checkUsers)

                    //  let oldimages = checkUsers.img_profile
                    //  let image = req.file.path
                     const uploadImage = await cloudyUpload(req.file.path);
                    //  img_profile = uploadImage.secure_url

                    //  if (oldimages == null){
                            
                           const UpdateUser = await users.update(
                                {
                                    username: req.body.username,
                                    fullname: req.body.fullname,
                                    role: req.body.role,
                                    img_profile: uploadImage.secure_url,
                                    occupation_id: req.body.occupation_id,
                                    institusi_name: req.body.institusi_name

                                },
                                {where: {id: req.params.id}}
                            );

                        

                        // } else {

                        //     // const uploadImage = await cloudyUpload(req.file.path);
                        //     await users.update(
                        //         {
                        //             username: username,
                        //             fullname: fullname,
                        //             // role: req.body.role,
                        //             img_profile: img_profile,
                        //             occupation_id: occupation_id,
                        //             institusi_name: institusi_name

                        //         },
                        //         {where: {id: req.params.id}}
                        //     );

                        // }

                    res.status(201).json({
                        status: 201,
                        // data: result,
                        // message: 'Bisa gais',
                        data: checkUsers
                    });

                } catch (err){
                    console.log(err);
                    res.send(err);
                }

        }
    }


    static async ChangePassword(req, res){
        const checkUsers = await users.findOne({ where: {id: req.params.id} });
        // const {oldPass, confPass} = req.body;

        if(!checkUsers){
            res.status(400).send({
                status: 400,
                message: "User Not Found",
            });

        }else { 

                try{

                    const isValidOldPass = await bcrypt.compare(
                        req.body.oldPass,
                        checkUsers.password
                    )


                        if (!isValidOldPass || req.body.newPass !== req.body.confPass) {
                            res.status(400).send({
                                status: 400,
                                message:"Change password failed!"
                            })
                        } else {

                            const salt = await bcrypt.genSalt()
                            const hashPassword = await bcrypt.hash(req.body.newPass, salt)

                            const respone = await users.update({
                                password: hashPassword
                            }, {where: {id: req.params.id} })

                            res.status(201).send({
                                message: "Password has ben changed!"
                            })

                        }
                

                }   catch (err){
                    console.log(err);
                    res.send(err);
                }

            }
    }


        static async DelUser(req, res) { 
        const checkUsers = await users.findOne({ where: {id: req.params.id} });

        if(!checkUsers){
            res.status(400).send({
                status: 400,
                message: "User Not Found",
            });

        }else {
            try {
                await users.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.json({
                    "message": "Data Deleted"
                });
            } catch (err) {
                console.log(err);
            }
        }

    }

};