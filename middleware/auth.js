const jwt = require("jsonwebtoken");

module.exports = class{


    static async auth (req, res, next) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            next()
        }

        catch(err) {
            res.status(400).send('Token tidak valid')
        }

    }

    static async navbar_verif (req, res) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            res.status(200).send({
                status: 200,
                info: verify
            })

        } catch(err) {
            res.status(400).send('Token anda tidak valis')
        }
    }

    static async verify_iduser (req, res, next) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            req.iduser = verify.userid
            next()

        } catch(err) {
            res.status(400).send('Token anda tidak valid')
        }
    }

    static async verify_contri (req, res, next) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            if (verify.roleuser == 2) {
                req.iduser = verify.userid
                next()
            }

            else {
                res.status(400).send('Token anda tidak valid')
        }

        } catch(err) {
            res.status(400).send('Token anda tidak valid')
        }
    }

    static async verify_reviewer (req, res, next) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            if (verify.roleuser == 3 || verify.roleuser == 4) {
                req.iduser = verify.userid
                next()
            }

            else {
                res.status(400).send('Token anda tidak valid')
        }

        } catch(err) {
            res.status(400).send('Token anda tidak valid')
        }
    }


    static async verify_admin (req, res, next) {
        const token = req.query.token

        if (token == undefined) {
            return res.status(401).send('Akses anda ditolak')
        }

        try {
            const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            if (verify.roleuser == 4) {
                req.iduser = verify.userid
                next()
            }
            
            else {
                    res.status(400).send('Token anda tidak valid')
            }

        } catch(err) {
            res.status(400).send('Token anda tidak valid')
        }
    }

   
}