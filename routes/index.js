var express = require('express');
var router = express.Router();


const cors = require('cors')
router.use(cors({
  origin: '*'
}))

const user = require('../controller/userController')
const rm = require('../controller/rumusController')
const api = require('../controller/moreController')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//user
router.post('/user/signin', user.Login)
router.post('/user/signup', user.Register)
router.get('/user/getAll', user.getUsers)
router.get('/user/:id', user.getUserById)
router.post('/user/editUser/:id', user.UpdateUser)
router.get('/user/changePass/:id', user.ChangePassword)
router.delete('/user/delUser/:id', user.DelUser)

//rumus
router.get('/rumus/all', rm.getRumus)
router.get('/rumus/kategori/:kategori', rm.getRumusByCateg)
router.get('/rumus/subkategori/:subkategori', rm.getRumusBySub)

//kategori
router.get('/ct/allCateg', api.getCategory)
router.get('/ct/categById/:id', api.getCategoryById)
router.post('/ct/createCateg', api.createCategory)
router.delete('/ct/delCateg/:id', api.DelCategory)

//sub kategori
router.get('/sct/allSubCateg', api.getSubCateg)
router.get('/sct/SubById/:id', api.getSubCategById)
router.post('/sct/AddSubCateg', api.createSubCateg)
router.delete('/sct/delSubCateg/:id', api.DelSubCateg)

//role
router.get('/role/allRole', api.getRole)
router.get('/role/RoleById/:id', api.getRoleById)
router.post('/role/createRole', api.createRole)
router.delete('/role/delRole/:id', api.DelRole)

//oocupation
router.get('/occup/allOccup', api.getOccupation)
router.get('/occup/OccupById/:id', api.getOccupationById)
router.post('/occup/createOccup', api.createOccupation)
router.delete('/occup/delOccupt/:id', api.DelOccupation)


//status
router.get('/status/allStatus', api.getStatus)
router.get('/status/StatusById/:id', api.getStatusById)
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
