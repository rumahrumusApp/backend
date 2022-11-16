var express = require('express');
var router = express.Router();


const cors = require('cors')
router.use(cors({
  origin: '*'
}))

const user = require('../controller/userController')
const rm = require('../controller/rumusController')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/signin', user.Login)
router.post('/user/signup', user.Register)
router.get('/user/getAll', user.getUsers)
router.get('/user/:id', user.getUserById)
router.post('/user/editUser/:id', user.UpdateUser)
router.get('/user/changePass/:id', user.ChangePassword)
router.delete('/user/delUser/:id', user.DelUser)


router.get('/rumus/all', rm.getRumus)
router.get('/rumus/kategori/:kategori', rm.getRumusByCateg)
router.get('/rumus/subkategori/:subkategori', rm.getRumusBySub)


module.exports = router;
