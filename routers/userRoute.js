const router = require('express').Router();
const {login, register, getAllUser} = require('../controller/userController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');

//get all authenicate user
router.get('/',getAllUser);
router.post('/register', register);
router.post('/login',login);
router.post('/recoveryPassword',auth,(req, res) =>{
    res.json({
        message:'Hello this is recoveryPassword'
    })
});

module.exports = router;

//register
//login
//password recovery


//users
//delete user
//update user
