const { category, occupation, sub_category, role, status, collection, rumus } = require("../models")

module.exports = class {

    //Category ============================
    static async getCategory(req, res){
        try {

            const result = await category.findAll();
            res.status(200).json({
                status:200,
                message: "All Categories",
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getCategoryById(req, res){
        const checkCategory = await category.findOne({where: {id: req.params.id} });

        if (!checkCategory){
            res.status(400).send({
                status:400,
                message: "Category NotFound",
            });

        } else {
                try {

                    const result = await category.findAll({where: {id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        message: "Category",
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}

    static async createCategory(req, res){
        const { name, order } = req.body;
        try {
                const respone = await category.create({
                    name: name,
                    order: order,
                });

                res.status(200).json({
                    status:200,
                    message: "Category created!",
                    data: respone,
                });

        } catch (error) {
            res.status(500).send(error);
        }
    }    


    static async EditCategory(req, res){
        const checkCategory = await category.findOne({ where: {id: req.params.id} });

        if(!checkCategory){
            res.status(400).send({
                status: 400,
                message: "Category Not Found",
            });

        }else {
            

                try{
                    const result = await category.update(
                        {
                            name: req.body.name,
                            order: req.body.order

                        },
                        {where: {id: req.params.id}}
                    );

                    res
                        .status(201)
                        .json({
                            status: 201,
                            message: "Category berhasil diubah"
                        })
                        .end();

                }catch (err){
                    console.log(err);
                    res.send(err);
                }
        }

    }

    static async DelCategory(req, res){
        const checkCategory = await category.findOne({where: {id: req.params.id} });

        if (!checkCategory){
            res.status(400).send({
                status:400,
                message: "Category NotFound",
            });

        } else {
            try {
                await category.destroy({
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

    //Sub Category ==========================================

    static async getSubCateg(req, res){
        try {

            const result = await sub_category.findAll();
            res.status(200).json({
                status:200,
                message:"All Sub Categories",
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getSubCategById(req, res){
        const checkSub = await sub_category.findOne({where: {id: req.params.id} });

        if (!checkSub){
            res.status(400).send({
                status:400,
                message: "Sub Category NotFound",
            });

        } else {
                try {

                    const result = await sub_category.findAll({where: {id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        message:"Sub Category",
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}



static async getSubCategByCategId(req, res){
    const checkSub = await sub_category.findAll({where: {category_id: req.params.id}, attributes: ['id', 'name'] });

    if (!checkSub){
        res.status(400).send({
            status:400,
            message: "Sub Category NotFound",
        });

    } else {
            try {

                // const result = await sub_category.findAll({where: {category_id: req.params.category_id} });
                res.status(200).json({
                    status:200,
                    message:`Sub categories with category id ${req.params.id}`,
                    data:checkSub ,
                });
                
            }  catch (err) {
                console.log(err);
                res.send(err);
     }
}
}

    static async createSubCateg(req, res){
        const { category_id, name, order } = req.body;
        try {
                const respone = await sub_category.create({
                    category_id: category_id,
                    name: name,
                    order: order,
                });

                res.status(200).json({
                    status:200,
                    message: "Sub Category created!",
                    data: respone,
                });

        } catch (error) {
            res.status(500).send(error);
        }
    }    

    static async DelSubCateg(req, res){
        const checkSub = await sub_category.findOne({where: {id: req.params.id} });

        if (!checkSub){
            res.status(400).send({
                status:400,
                message: "Sub Category NotFound",
            });

        } else {
            try {
                await sub_category.destroy({
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


    //Role ====================================
    static async getRole(req, res){
        try {

            const result = await role.findAll();
            res.status(200).json({
                status:200,
                message:"All Role",
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getRoleById(req, res){
        const checkRole = await role.findOne({where: {id: req.params.id} });

        if (!checkRole){
            res.status(400).send({
                status:400,
                message: "Role NotFound",
            });

        } else {
                try {

                    const result = await role.findAll({where: {id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        message:"Role",
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}


static async createRole(req, res){
    const { name, order } = req.body;
    try {
            const respone = await role.create({
                name: name,
                order: order,
            });

            res.status(200).json({
                status:200,
                message: "Role created!",
                data: respone,
            });

    } catch (error) {
        res.status(500).send(error);
    }
}    

static async DelRole(req, res){
    const checkCategory = await role.findOne({where: {id: req.params.id} });

    if (!checkCategory){
        res.status(400).send({
            status:400,
            message: "Role NotFound",
        });

    } else {
        try {
            await role.destroy({
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

    // occupation ============================
    static async getOccupation(req, res){
        try {

            const result = await occupation.findAll();
            res.status(200).json({
                status:200,
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getOccupationById(req, res){
        const checkOccup = await occupation.findOne({where: {id: req.params.id} });

        if (!checkOccup){
            res.status(400).send({
                status:400,
                message: "Occupation NotFound",
            });

        } else {
                try {

                    const result = await occupation.findAll({where: {id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}

    static async createOccupation(req, res){
        const { name, order} = req.body;
        try {
                const respone = await occupation.create({
                    name: name,
                    order: order,
                });

                res.status(200).json({
                    status:200,
                    message: "Occupation created!",
                    data: respone,
                });

        } catch (error) {
            res.status(500).send(error);
        }
    }    

    static async DelOccupation(req, res){
        const checkOccup = await occupation.findOne({where: {id: req.params.id} });

        if (!checkOccup){
            res.status(400).send({
                status:400,
                message: "Occupation NotFound",
            });

        } else {
            try {
                await occupation.destroy({
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

    // Status

    static async getStatus(req,res){
        try {

            const result = await status.findAll();
            res.status(200).json({
                status:200,
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getStatusById(req, res){
        const checkStatus = await status.findOne({where: {id: req.params.id} });

        if (!checkStatus){
            res.status(400).send({
                status:400,
                message: "Status NotFound",
            });

        } else {
                try {

                    const result = await status.findAll({where: {id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}

    static async createStatus(req, res){
        const { name, order } = req.body;
        try {
                const respone = await status.create({
                    name: name,
                    order: order,
                });

                res.status(200).json({
                    status:200,
                    message: "Status created!",
                    data: respone,
                });

        } catch (error) {
            res.status(500).send(error);
        }
    }    

    static async DelStatus(req, res){
        const checkStatus = await status.findOne({where: {id: req.params.id} });

        if (!checkStatus){
            res.status(400).send({
                status:400,
                message: "Status NotFound",
            });

        } else {
            try {
                await status.destroy({
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

    //Collection

    static async getCollect(req, res){
        try {

            const result = await collection.findAll();
            res.status(200).json({
                status:200,
                data:result,
            });
            
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async getCollectById(req, res){
        const checkCollect = await collection.findOne({where: {user_id: req.params.id} });

        if (!checkCollect){
            res.status(400).send({
                status:400,
                message: "Collect NotFound",
            });

        } else {
                try {

                    const result = await collection.findAll({
                        include: [
                       
                          'rumus'
                       
       
                     ], },{where: {user_id: req.params.id} });
                    res.status(200).json({
                        status:200,
                        data:result,
                    });
                    
                }  catch (err) {
                    console.log(err);
                    res.send(err);
         }
    }
}

    static async AddCollect(req, res){
        const { user_id, rumus_id } = req.body;
        try {
                const respone = await collection.create({
                    user_id: user_id,
                    rumus_id: rumus_id,
                });

                res.status(200).json({
                    status:200,
                    message: "Collection added!",
                    data: respone,
                });

        } catch (error) {
            res.status(500).send(error);
        }
    }    

    static async DelCollect(req, res){
        const checkCollect = await collection.findOne({where: {id: req.params.id} });

        if (!checkCollect){
            res.status(400).send({
                status:400,
                message: "Collect NotFound",
            });

        } else {
            try {
                await collection.destroy({
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

}

