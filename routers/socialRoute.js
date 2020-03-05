const router = require('express').Router();
const {create, getAll, update, removeSocial} = require('../controller/socialController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:socialId', auth, admin, update)
 router.delete('/:socialId', auth, admin, removeSocial)
module.exports = router;