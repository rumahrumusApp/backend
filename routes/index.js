var express = require('express');
const multer = require("../middleware/multer")
const upload = require("../utils/upload");
const uploadOnMemory = require("../utils/memoryUpload");
const auth = require("../middleware/auth");
var verify = require("../middleware/login");

const app = require("express");
const appRouter = express.Router();
const fileUpload = require('express-fileupload')

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

router.post('/user/editUser/:id', multer.single("img_profile"),user.UpdateUser);

router.post('/user/changePass/:id', user.ChangePassword)
router.delete('/user/delUser/:id', user.DelUser)

//rumus
router.get('/rumus/all', rm.getRumus)
router.get('/rumus/categ/:category_id', rm.getRumusByCateg)
router.get('/rumus/subcateg/:id', rm.getRumusBySub)
router.get('/rumus/getOne/:id',  rm.getRumusById)
router.get('/rumus/keyword', rm.getRumusByKeyword)


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
router.post('/sct/editSubCateg/:id', api.EditSubCategory)
router.delete('/sct/delSubCateg/:id', api.DelSubCateg)

//role
router.get('/role/allRole', api.getRole)
router.get('/role/roleById/:id', api.getRoleById)
router.post('/role/createRole', api.createRole)
router.post('/role/editRole/:id', api.EditRole)
router.delete('/role/delRole/:id', api.DelRole)

//oocupation
router.get('/occup/allOccup', api.getOccupation)
router.get('/occup/occupById/:id', api.getOccupationById)
router.post('/occup/createOccup', api.createOccupation)
router.post('/occup/editOccup/:id', api.EditOccup)
router.delete('/occup/delOccupt/:id', api.DelOccupation)


//status
router.get('/status/allStatus', api.getStatus)
router.get('/status/statusById/:id', api.getStatusById)
router.post('/status/createStatus', api.createStatus)
router.post('/status/editStatus/:id', api.EditStatus)
router.delete('/status/delStatus/:id', api.DelStatus)


//collection
router.get('/collect/allCollect', api.getCollect)
router.get('/collect/collectById/:id', api.getCollectById)
router.post('/collect/addCollect', api.AddCollect)
router.delete('/collect/delCollect/:id', api.DelCollect)


//reviewer 
router.post('/rumus/review/:id', rm.ReviewRumus)
router.get('/rumus/allrumus', rm.getRumusAll)


//reviewer&admin
router.get('/rumus/getdatasubmits', rm.getRumusSubmissions)
router.get('/rumus/getdatasubmitbyid/:id', rm.getRumusSubmissionsById)


//contributor
router.get('/rumus/myrumus/:id', rm.getRumusByUser)


//admin
router.post('/rumus/editbyAdmin/:id', rm.EditRumusByAdmin)
router.post('/user/editbyAdmin/:id',multer.single("img_profile"), user.UpdateUserByAdmin)


//pengelola






module.exports = router;
