var express = require('express');
// app.use(express.json);
const Multer = require("multer");
const multer = require("../middleware/multer")
const upload = require("../utils/upload");
const uploadOnMemory = require("../utils/memoryUpload");

const app = require("express");
const appRouter = express.Router();
const apiRouter = express.Router();

// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: "5000mb"}));
// app.use(bodyParser.urlencoded({limit: "5000mb", extended: true, parameterLimit:50000}));

const storages = Multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './storages')
    },
    fileName: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extrame(file.originalname))
    }
})


var router = express.Router();
// const router = require('express-promise-router')();
const dotenv = require("dotenv");
dotenv.config();

const cors = require('cors')
router.use(cors({
  origin: '*'
}))

const user = require('../controller/userController')
const rm = require('../controller/rumusController')
const api = require('../controller/moreController');
// const { AddRumus } = require('../controller/rumusController');
const memoryUpload = require('../utils/memoryUpload');
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//user
router.post('/user/signin', user.Login)
router.post('/user/signup', user.Register)

router.get('/user/getAll', user.getUsers)
router.get('/user/:id', user.getUserById)
router.get('/user/profile/:id', user.getUserProfile) //blm add postman

router.post('/user/editUser/:id', 
  multer.single("img_profile"),
  user.UpdateUser);

router.post('/user/changePass/:id', user.ChangePassword)
router.delete('/user/delUser/:id', user.DelUser)

//rumus
router.get('/rumus/all', rm.getRumus)
router.get('/rumus/categ/:kategori', rm.getRumusByCateg)
router.get('/rumus/subcateg/:subkategori', rm.getRumusBySub)
router.get('/rumus/search/keyword', rm.getRumusByKeyword)


router.post('/rumus/editRumus/:id', uploadOnMemory.any(["img_ilustrasi", "img_rumus", "img_contoh"]) ,rm.EditRumus)
router.post('/rumus/addRumus', uploadOnMemory.any(["img_ilustrasi", "img_rumus", "img_contoh"]), rm.AddRumus)
router.delete('/rumus/delRumus/:id', rm.DelRumus)

//kategori
router.get('/ct/allCateg', api.getCategory)
router.get('/ct/categById/:id', api.getCategoryById)
router.post('/ct/createCateg', api.createCategory)
router.post('/ct/editCateg/:id', api.EditCategory)
router.delete('/ct/delCateg/:id', api.DelCategory)

//sub kategori
router.get('/sct/allSubCateg', api.getSubCateg)
router.get('/sct/subById/:id', api.getSubCategById)
router.get('/sct/subByCategId/:id', api.getSubCategByCategId)
router.post('/sct/addSubCateg', api.createSubCateg)
router.delete('/sct/delSubCateg/:id', api.DelSubCateg)

//role
router.get('/role/allRole', api.getRole)
router.get('/role/roleById/:id', api.getRoleById)
router.post('/role/createRole', api.createRole)
router.delete('/role/delRole/:id', api.DelRole)

//oocupation
router.get('/occup/allOccup', api.getOccupation)
router.get('/occup/occupById/:id', api.getOccupationById)
router.post('/occup/createOccup', api.createOccupation)
router.delete('/occup/delOccupt/:id', api.DelOccupation)


//status
router.get('/status/allStatus', api.getStatus)
router.get('/status/statusById/:id', api.getStatusById)
router.post('/status/createStatus', api.createStatus)
router.delete('/status/delStatus/:id', api.DelStatus)


//collection
router.get('/collect/allCollect', api.getCollect)
router.get('/collect/collectById/:id', api.getCollectById)
router.post('/collect/addCollect', api.AddCollect)
router.delete('/collect/delCollect/:id', api.DelCollect)


//reviewer
//contributor
//admin
//pengelola






module.exports = router;
