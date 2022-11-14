var express = require('express');
var router = express.Router();

const user = require('../controller/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', user.Login)
router.post('/register', user.Register)
router.post('/getUsers', user.getUsers)
router.post('/User', user.getUserById)
router.post('/editUser', user.UpdateUser)

module.exports = router;
