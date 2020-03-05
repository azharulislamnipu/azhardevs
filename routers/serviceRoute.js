const router = require('express').Router();
const {create, getAll, update, removeService} = require('../controller/serviceController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:serviceId', auth, admin, update)
router.delete('/:serviceId', auth, admin, removeService)
module.exports = router;