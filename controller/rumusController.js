const { rumus,category, sub_category,users,status, sequelize } = require("../models");
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
            const result = await rumus.findAll({ 
                include: [
                
                'contributor',
                'status',
                

           ], where:{status_id: 4}});
           
            res.status(200).json({
                status:200,
                data: result,
            });

        } catch(err){
            console.log(err);
            res.send(err);
        }
    }



    static async getRumusAll(req, res){
        try{
            const result = await rumus.findAll({ 
                include: [
                
                'contributor',
                'status',
                

           ]});
           
            res.status(200).json({
                status:200,
                data: result,
            });

        } catch(err){
            console.log(err);
            res.send(err);
        }
    }


    static async getRumusByUser(req, res){
        try{
            const result = await rumus.findAll({ 
                include: [
                    { model: status, attributes: ['name'], as: 'status' },
                    { model: users, attributes: ['username'], as: 'contributor' }
                ], where:{contributor_id: req.iduser}});

           if (result.length == 0) {
                res.send({
                    status:404,
                    message: "Rumus NotFound",
                }); 

           }else{
           
                res.status(200).json({
                    status:200,
                    data: result,
                });
        }

        } catch(err){
            console.log(err);
            res.send(err);
        }

    }

    static async getRumusByCateg(req, res){
        const checkRumus = await rumus.findOne({where: {category_id: req.params.category_id, status_id: 4}})

        if (!checkRumus){
            res.status(400).send({
                status:400,
                message: "Rumus tidak ditemukan!",

            });
            
        } else {
            try {
                const result = await rumus.findAll({
                    where: {category_id: req.params.category_id, status_id: 4},
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
        const checkRumus = await rumus.findAll({where: {sub_category_id: req.params.id, status_id: 4}})

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


    static async getRumusById(req, res){
        const checkRumus = await rumus.findOne({where: {id: req.params.id}})

        if (!checkRumus){
            res.status(400).send({
                status:400,
                message: "Rumus tidak ditemukan!",

            });
            
        } else {
            try {
                const result = await rumus.findOne({
                    include: [
                
                        'category',
                        'subcategory',
                        
        
                   ], where: {id: req.params.id},
                });
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



    static async getRumusSubmissions(req, res){

        try{
                const checkRumus = await rumus.findAll({

                    include: [
                        'contributor',
                        'status',
                    ], where: {status_id: 2} })

                if (!checkRumus){
                    res.status(400).send({
                        status:400,
                        message: "Rumus tidak ditemukan!",

                    });
                    
                } else {
                        res.status(200).json({
                            status: 200,
                            data: checkRumus,
                        });

                }

         } catch(err){
                console.log(err);
                res.send(err);        
         }
 }


 static async getRumusSubmissionsById(req, res){

    try{
            const checkRumus = await rumus.findOne({where: {id: req.params.id, status_id: 2},
                include: [
                    { model: category, attributes: ['name'], as: 'category' },
                    { model: sub_category, attributes: ['name'], as: 'subcategory' },
                    { model: users, attributes: ['username'], as: 'contributor' }
                ] })


            if (!checkRumus){
                res.status(400).send({
                    status:400,
                    message: "Rumus tidak ditemukan!",

                });
                
            } else {
                    res.status(200).json({
                        status: 200,
                        data: checkRumus,
                    });

            }

     } catch(err){
            console.log(err);
            res.send(err);        
     }
     
}



    static async getRumusByKeyword(req, res) {
        try {
            console.log(req.query.key)
            let lookupValue = req.query.key.toLowerCase()
            console.log('key: ', lookupValue)
            const result = await rumus.findAll({
        
                where: {
                    title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + lookupValue + '%'),
                    status_id: 4
                }
            })

            if (result.length == 0) {
                res.send({
                    status: 404,
                    message: 'Data not exist!'
                })
            }

            else {
                res.status(200).json({
                    status: 200,
                    message: `All rumus match with keyword`,
                    data: result
                })
            }
        }

        catch(err) {
            console.log(err)
            res.send(err)
        }
    }




    static async AddRumus(req, res){
       
          const {title, category_id, sub_category_id,img_ilustrasi, img_rumus, img_contoh, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;

    
        try{
            let imgUpload = [];
            let fileBase64 =[];
            const file = [];

               for (var i = 0; i< req.files.length; i++) {
                fileBase64.push(req.files[i].buffer.toString("base64"));
                file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                const result = await cloudyUpload(file[i]);
                imgUpload.push(result.secure_url);
               }

            const rumusCreated = await rumus.create({
                    title: title,
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    img_ilustrasi: imgUpload[0],
                    img_rumus: imgUpload[1],
                    img_contoh: imgUpload[2],
                    reviewer_id: reviewer_id,
                    contributor_id: contributor_id,
                    catatan: catatan,
                    komentar: komentar,
                    status_id : status_id,
            });

                // for (var i = 0; i< req.files.length; i++) {
                //     fileBase64.push(req.files[i].buffer.toString("base64"));
                //     file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                //     const result = await cloudyUpload(file[i]);
                //     imgUpload.push(result.secure_url);

                // }

                // const uploadimg = await rumus.update({
                //     img_ilustrasi: imgUpload[0],
                //     img_rumus: imgUpload[1],
                //     img_contoh: imgUpload[2]}, {where: {id: rumusCreated.id}
                // });
           
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
                //     imgUpload.push(result.secure_url);
                 
                    
                //     await rumus.update({
                //       img_ilustrasi: imgUpload[0],
                //       img_rumus : imgUpload[1],
                //       img_contoh: imgUpload[2],
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

        const {title, category_id, sub_category_id, reviewer_id,img_ilustrasi, img_rumus, img_contoh,contributor_id, catatan, komentar,status_id } = req.body;
        // const {title, kategori, subkategori, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;
        const checkData = await rumus.findOne({ where: {id: req.params.id} });

        if(!checkData){
            res.status(400).send({
                status: 400,
                message: "Rumus NotFound",
            });
        } else {
            

            try{

                let imgUpload = [];
                let fileBase64 =[];
                const file = [];
    
                   for (var i = 0; i< req.files.length; i++) {
                    fileBase64.push(req.files[i].buffer.toString("base64"));
                    file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                    const result = await cloudyUpload(file[i]);
                    imgUpload.push(result.secure_url);
                   }
    
                    const rumusUpdate = await rumus.update({
                        title: title,
                        category_id: category_id,
                        sub_category_id: sub_category_id,
                        img_ilustrasi: imgUpload[0],
                        img_rumus: imgUpload[1],
                        img_contoh: imgUpload[2],
                        // reviewer_id: reviewer_id,
                        contributor_id: contributor_id,
                        catatan: catatan,
                        // komentar: komentar,
                        status_id : status_id,
                }, { where: { id: req.params.id }});

                // let img_ilust = [];
                // let img_rum = [];
                // let img_cont = [];
                // let fileBase64 =[];
                // const file = [];

                // const del = req.params.id;

                // const PicDel = await rumus.findOne( {where: {id: del}})



                // let cloudIlust = [checkData.img_ilustrasi, checkData.img_rumus, checkData.img_contoh];

                // cloudIlust[0] = cloudIlust[0]?.substring(62, 82);
                // cloudIlust[1] = cloudIlust[1]?.substring(62, 82);
                // cloudIlust[2] = cloudIlust[2]?.substring(62, 82);
                
                // for (let i = 0; i <= 2; i++) {
                //     cloudyDelete(cloudIlust[i])
                // }
                        



                        //     const rumusEdit = await rumus.update({
                        //         title: title,
                        //         kategori: kategori,
                        //         subkategori: subkategori,
                        //         reviewer_id: reviewer_id,
                        //         img_ilustrasi: img_ilustrasi,
                        //         img_rumus: img_rumus,
                        //         img_contoh: img_contoh,
                        //         contributor_id: contributor_id,
                        //         catatan: catatan,
                        //         komentar: komentar,
                        //         status_id : status_id 
                        //     },
                        //          { where: { 
                        //             id: req.params.id
                        //      }}
                        // ); 
                        
                             
                        
              



                            // for (var i = 0; i<=2; i++) {
                            //     fileBase64.push(req.files[i].buffer.toString("base64"));
                            //     file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                            //     const result = await cloudyUpload(file[i]);
                            //     img_ilust.push(result.secure_url);
                            //     img_rum.push(result.secure_url);
                            //     img_cont.push(result.secure_url);

                            //     await rumus.create({
                            //         img_ilustrasi: img_ilust[0],
                            //         img_rumus : img_rum[1],
                            //         img_contoh: img_cont[2],
                            //         }, { where: { id: checkData.id }});
                               
                            // } 

                        
                            
                            // const respone = await rumus.findByPk(rumusEdit.id)

                            res.status(201).json({
                              message: "Rumus Updated!",
                             data: rumusUpdate
                            });


                    } catch(err){
                        console.log(err);
                        res.send(err);
                    }

         }
    

    }


    static async EditRumusByAdmin(req, res){

        const {title, category_id, sub_category_id, reviewer_id,img_ilustrasi, img_rumus, img_contoh,contributor_id, catatan, komentar,status_id } = req.body;
        // const {title, kategori, subkategori, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;
        const checkData = await rumus.findOne({ where: {id: req.params.id} });

        if(!checkData){
            res.status(400).send({
                status: 400,
                message: "Rumus NotFound",
            });
        } else {
            

            try{

                let imgUpload = [];
                let fileBase64 =[];
                const file = [];
    
                   for (var i = 0; i< req.files.length; i++) {
                    fileBase64.push(req.files[i].buffer.toString("base64"));
                    file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                    const result = await cloudyUpload(file[i]);
                    imgUpload.push(result.secure_url);
                   }
    
                    const rumusUpdate = await rumus.update({
                        title: title,
                        category_id: category_id,
                        sub_category_id: sub_category_id,
                        img_ilustrasi: imgUpload[0],
                        img_rumus: imgUpload[1],
                        img_contoh: imgUpload[2],
                        reviewer_id: reviewer_id,
                        contributor_id: contributor_id,
                        catatan: catatan,
                        komentar: komentar,
                        status_id : status_id,
                }, { where: { id: req.params.id }});

                // let img_ilust = [];
                // let img_rum = [];
                // let img_cont = [];
                // let fileBase64 =[];
                // const file = [];

                // const del = req.params.id;

                // const PicDel = await rumus.findOne( {where: {id: del}})



                // let cloudIlust = [checkData.img_ilustrasi, checkData.img_rumus, checkData.img_contoh];

                // cloudIlust[0] = cloudIlust[0]?.substring(62, 82);
                // cloudIlust[1] = cloudIlust[1]?.substring(62, 82);
                // cloudIlust[2] = cloudIlust[2]?.substring(62, 82);
                
                // for (let i = 0; i <= 2; i++) {
                //     cloudyDelete(cloudIlust[i])
                // }
                        



                        //     const rumusEdit = await rumus.update({
                        //         title: title,
                        //         kategori: kategori,
                        //         subkategori: subkategori,
                        //         reviewer_id: reviewer_id,
                        //         img_ilustrasi: img_ilustrasi,
                        //         img_rumus: img_rumus,
                        //         img_contoh: img_contoh,
                        //         contributor_id: contributor_id,
                        //         catatan: catatan,
                        //         komentar: komentar,
                        //         status_id : status_id 
                        //     },
                        //          { where: { 
                        //             id: req.params.id
                        //      }}
                        // ); 
                        
                             
                        
              



                            // for (var i = 0; i<=2; i++) {
                            //     fileBase64.push(req.files[i].buffer.toString("base64"));
                            //     file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                            //     const result = await cloudyUpload(file[i]);
                            //     img_ilust.push(result.secure_url);
                            //     img_rum.push(result.secure_url);
                            //     img_cont.push(result.secure_url);

                            //     await rumus.create({
                            //         img_ilustrasi: img_ilust[0],
                            //         img_rumus : img_rum[1],
                            //         img_contoh: img_cont[2],
                            //         }, { where: { id: checkData.id }});
                               
                            // } 

                        
                            
                            // const respone = await rumus.findByPk(rumusEdit.id)

                            res.status(201).json({
                              message: "Rumus Updated!",
                             data: rumusUpdate
                            });


                    } catch(err){
                        console.log(err);
                        res.send(err);
                    }

         }
    

    }


    static async ReviewRumus(req, res){

        const {reviewer_id,komentar,status_id } = req.body;
        // const {title, kategori, subkategori, reviewer_id,contributor_id, catatan, komentar,status_id } = req.body;
        const checkData = await rumus.findOne({ where: {id: req.params.id} });

        if(!checkData){
            res.status(400).send({
                status: 400,
                message: "Rumus NotFound",
            });

        } else {
            

            try{
                   const result= await rumus.update({
                        reviewer_id: req.body.reviewer_id,
                        komentar: req.body.komentar,
                        status_id :req.body.status_id,

                }, {where: { id: req.params.id }});


                res.status(201).json({
                    message: "Review Succes!",
                     data: result
                    });


                    } catch(err){
                        console.log(err);
                        res.send(err);
                    }

         }
    

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