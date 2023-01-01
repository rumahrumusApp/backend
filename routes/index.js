var express = require('express');
const multer = require("../middleware/multer")
const upload = require("../utils/upload");
const uploadOnMemory = require("../utils/memoryUpload");

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
const a = require('../middleware/auth')
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//user
router.get('/rumus/all', rm.getRumus)
router.get('/rumus/categ/:category_id', rm.getRumusByCateg)
router.get('/rumus/subcateg/:id', rm.getRumusBySub)
router.get('/rumus/getOne/:id',  rm.getRumusById)
router.get('/rumus/keyword', rm.getRumusByKeyword)

router.get('/rumus/myrumus', a.verify_iduser, rm.getRumusByUser)


router.get('/user/info', a.navbar_verif)

router.post('/user/signin', user.Login)
router.post('/user/signup', user.Register)


router.get('/user/profile', a.verify_iduser, user.getUserProfile) //blm add postman
router.post('/user/editUser', a.verify_iduser, multer.single("img_profile"),user.UpdateUser);
router.post('/user/changePass', a.verify_iduser, user.ChangePassword)


// Admin
router.get('/user/getAll', a.verify_admin, user.getUsers)
router.get('/user/:id', a.verify_admin, user.getUserById)
router.delete('/user/delUser/:id', a.verify_admin, user.DelUser)
router.post('/rumus/editbyAdmin/:id', a.verify_admin, rm.EditRumusByAdmin)
router.post('/user/editbyAdmin/:id',a.verify_admin, multer.single("img_profile"), user.UpdateUserByAdmin)

//reviewer 
router.post('/rumus/:id/review',a.verify_reviewer, rm.ReviewRumus)


//reviewer&admin
router.get('/rumus/getdatasubmits', a.verify_reviewer, rm.getRumusSubmissions)
router.get('/rumus/getdatasubmitbyid/:id',a.verify_reviewer, rm.getRumusSubmissionsById)
router.get('/rumus/allrumus', a.verify_reviewer, rm.getRumusAll)


//rumus
router.post('/rumus/editRumus/:id', uploadOnMemory.any(["img_ilustrasi", "img_rumus", "img_contoh"]) ,rm.EditRumus)
router.post('/rumus/addRumus', uploadOnMemory.any(["img_ilustrasi", "img_rumus", "img_contoh"]), rm.AddRumus)
router.delete('/rumus/delRumus/:id', rm.DelRumus)

//kategori
router.get('/ct/allCateg', api.getCategory)
router.get('/ct/categById/:id', api.getCategoryById)
router.post('/ct/createCateg', a.verify_admin, api.createCategory)
router.post('/ct/editCateg/:id', a.verify_admin, api.EditCategory)
router.delete('/ct/delCateg/:id', a.verify_admin, api.DelCategory)

//sub kategori
router.get('/sct/allSubCateg', api.getSubCateg)
router.get('/sct/subById/:id', api.getSubCategById)
router.get('/sct/subByCategId/:id', api.getSubCategByCategId)
router.post('/sct/addSubCateg',a.verify_admin, api.createSubCateg)
router.post('/sct/editSubCateg/:id', a.verify_admin, api.EditSubCategory)
router.delete('/sct/delSubCateg/:id', a.verify_admin, api.DelSubCateg)

//role
router.get('/role/allRole', api.getRole)
router.get('/role/roleById/:id', api.getRoleById)
router.post('/role/createRole',a.verify_admin, api.createRole)
router.post('/role/editRole/:id', a.verify_admin, api.EditRole)
router.delete('/role/delRole/:id', a.verify_admin, api.DelRole)

//oocupation
router.get('/occup/allOccup',  api.getOccupation)
router.get('/occup/occupById/:id', api.getOccupationById)
router.post('/occup/createOccup', a.verify_admin, api.createOccupation)
router.post('/occup/editOccup/:id',  a.verify_admin, api.EditOccup)
router.delete('/occup/delOccupt/:id',a.verify_admin, api.DelOccupation)


//status
router.get('/status/allStatus', api.getStatus)
router.get('/status/statusById/:id', api.getStatusById)
router.post('/status/createStatus', a.verify_admin, api.createStatus)
router.post('/status/editStatus/:id', a.verify_admin, api.EditStatus)
router.delete('/status/delStatus/:id', a.verify_admin, api.DelStatus)


//collection
router.get('/collect/allCollect', api.getCollect)
router.get('/collect/collectById',a.verify_iduser, api.getCollectById)
router.post('/collect/addCollect',  api.AddCollect)
router.delete('/collect/delCollect/:id', api.DelCollect)




module.exports = router;
