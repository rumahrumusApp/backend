const { rumus } = require("../models");


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
        const checkRumus = await rumus.findOne({where: {subkategori: req.params.subkategori}})

        if (!checkRumus){
            res.status(400).send({
                status:400,
                message: "Rumus tidak ditemukan!",

            });
            
        } else {
            try {
                const result = await rumus.findAll({
                    where: {subkategori: req.params.subkategori},
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

    static async AddRumus(res, req){
        
    }


    static async EditRumus(res, req){

    }


    static async getRumusByKeyword(res, req){

    }

    static async getDelRumus(res, req){

    }



}