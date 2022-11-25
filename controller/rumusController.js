const { rumus } = require("../models");
// const path = require("fs");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const multer = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");
const { promisify } = require("util");
const upload = require("../utils/upload");
const cloudyUpload = promisify(cloudinary.uploader.upload);
const cloudyDelete = promisify(cloudinary.uploader.destroy);


module.exports = class {
    static async getRumus(req, res){
        try{
            const result = await rumus.findAll();
            res.status(200).json({
                status:200,
                data: result,
            });

        } catch(err){
            console.log(err);
            res.send(err);
        }
    }

    static async getRumusByCateg(req, res){
        const checkRumus = await rumus.findOne({where: {kategori: req.params.kategori}})

        if (!checkRumus){
            res.status(400).send({
                status:400,
                message: "Rumus tidak ditemukan!",

            });
            
        } else {
            try {
                const result = await rumus.findAll({
                    where: {kategori: req.params.kategori},
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

    static async getRumusBySub(req, res){
        const checkRumus = await rumus.findAll({where: {sub_category_id: req.params.subkategori}})

        if (!checkRumus){
            res.status(400).send({
                status:400,
                message: "Rumus tidak ditemukan!",

            });
            
        } else {
            try {
                // const result = await rumus.findAll({
                //     where: {subkategori: req.params.subkategori},
                // });
                res.status(200).json({
                    status: 200,
                    data:checkRumus,
                });

            } catch(err){
                console.log(err);
                res.send(err);
            }
        }

    }

    static async AddRumus(req, res){
       
          const {title, category_id, sub_category_id,img_ilustrasi, img_rumus, img_contoh, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;

    
        try{
            let imgUpload = [];
            let fileBase64 =[];
            const file = [];

            const rumusCreated = await rumus.create({
                title: title,
                category_id: category_id,
                sub_category_id: sub_category_id,
                reviewer_id: reviewer_id,
                contributor_id: contributor_id,
                catatan: catatan,
                komentar: komentar,
                status_id : status_id,
            });

                for (var i = 0; i<= 2; i++) {
                    fileBase64.push(req.files[i].buffer.toString("base64"));
                    file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                    const result = await cloudyUpload(file[i]);
                    imgUpload.push(result.secure_url);

                }

                const uploadimg = await rumus.update({
                    img_ilustrasi: imgUpload[0],
                    img_rumus: imgUpload[1],
                    img_contoh: imgUpload[2]}, {where: {id: rumusCreated.id}
                });
           
                //  const rumusCreated = await rumus.create({
                //     title: title,
                //     kategori: kategori,
                //     subkategori: subkategori,
                //     img_ilustrasi: imgUpload[0],
                //     img_rumus: imgUpload[1],
                //     img_contoh: imgUpload[2],
                //     reviewer_id: reviewer_id,
                //     contributor_id: contributor_id,
                //     catatan: catatan,
                //     komentar: komentar,
                //     status_id : status_id,
                // });


                //  for (var i = 0; i< req.files.length; i++) {
                //     fileBase64.push(req.files[i].buffer.toString("base64"));
                //     file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                //     const result = await cloudyUpload(file[i]);
                //     img_ilust.push(result.secure_url);
                //     img_rum.push(result.secure_url);
                //     img_cont.push(result.secure_url);
                    
                //     await rumus.update({
                //       img_ilustrasi: img_ilust[0],
                //       img_rumus : img_rum[1],
                //       img_contoh: img_cont[2],
                //     }, {where: {id: rumusCreated.id}} );

                //  }


                  const respone = await rumus.findByPk(rumusCreated.id)

                  res.status(201).json({
                    message: "Rumus Created",
                    data: respone
                  });
          
        } catch (err){
            console.log(err);
            res.send(err);
        }
        
    }


    static async EditRumus(req, res){

        const {title, kategori, subkategori, reviewer_id,img_ilustrasi, img_rumus, img_contoh,contributor_id, catatan, komentar,status_id } = req.body;
        // const {title, kategori, subkategori, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;
        const checkData = await rumus.findOne({ where: {id: req.params.id} });

        if(!checkData){
            res.status(400).send({
                status: 400,
                message: "Rumus NotFound",
            });
        } else {
            

            try{

                let img_ilust = [];
                let img_rum = [];
                let img_cont = [];
                let fileBase64 =[];
                const file = [];

                // const del = req.params.id;

                // const PicDel = await rumus.findOne( {where: {id: del}})



                let cloudIlust = [checkData.img_ilustrasi, checkData.img_rumus, checkData.img_contoh];

                cloudIlust[0] = cloudIlust[0]?.substring(62, 82);
                cloudIlust[1] = cloudIlust[1]?.substring(62, 82);
                cloudIlust[2] = cloudIlust[2]?.substring(62, 82);
                
                for (let i = 0; i <= 2; i++) {
                    cloudyDelete(cloudIlust[i])
                }
                        



                            const rumusEdit = await rumus.update({
                                title: title,
                                kategori: kategori,
                                subkategori: subkategori,
                                reviewer_id: reviewer_id,
                                img_ilustrasi: img_ilustrasi,
                                img_rumus: img_rumus,
                                img_contoh: img_contoh,
                                contributor_id: contributor_id,
                                catatan: catatan,
                                komentar: komentar,
                                status_id : status_id 
                            },
                                 { where: { 
                                    id: req.params.id
                             }}
                        ); 
                        
                             
                        
              



                            for (var i = 0; i<=2; i++) {
                                fileBase64.push(req.files[i].buffer.toString("base64"));
                                file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                                const result = await cloudyUpload(file[i]);
                                img_ilust.push(result.secure_url);
                                img_rum.push(result.secure_url);
                                img_cont.push(result.secure_url);

                                await rumus.create({
                                    img_ilustrasi: img_ilust[0],
                                    img_rumus : img_rum[1],
                                    img_contoh: img_cont[2],
                                    }, { where: { id: checkData.id }});
                               
                            } 

                        
                            
                            const respone = await rumus.findByPk(rumusEdit.id)

                            res.status(201).json({
                              message: "Rumus Updated!",
                             data: respone
                            });


                    } catch(err){
                        console.log(err);
                        res.send(err);
                    }

         }
    

    }


    static async getRumusByKeyword(res, req){

    }

    static async DelRumus(req, res){

        const checkData = await rumus.findOne({ where: {id: req.params.id} });

        if(!checkData){
            res.status(400).send({
                status: 400,
                message: "Rumus NotFound",
            });

        }else {
            try {

                const del = req.params.id;

                const PicDel = await rumus.findAll( {where: {id: del}})

                let cloudIlust, cloudRumus, cloudContoh;

                if (PicDel.length == null){
                    await rumus.destroy({
                        where: {
                            id: req.params.id
                        }
                    });    

                } else if (PicDel.length > 0){
                    for (var i = 0; i < PicDel.length; i++){
                        cloudIlust = PicDel[i].img_ilustrasi?.substring(62, 82);
                        cloudRumus = PicDel[i].img_rumus?.substring(62, 82);
                        cloudContoh = PicDel[i].img_contoh?.substring(62, 82);
                        cloudyDelete[cloudIlust,cloudRumus,cloudContoh]; 
                    }

                    await rumus.destroy({
                        where: { 
                            id: req.params.id
                        }
                    });
    
                }
            
                res.json({
                    "message": "Data Deleted"
                });


            } catch (err) {
                console.log(err);
                res.send(err);
        }

        

    }


}
}