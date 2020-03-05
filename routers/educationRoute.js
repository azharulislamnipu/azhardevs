const router = require('express').Router();
const {create,getAll, update,remove} = require('../controller/educationController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:educationId', auth, admin, update)
router.delete('/:educationId', auth, admin, remove)
module.exports = router;