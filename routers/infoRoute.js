const router = require('express').Router();
const {create,getAll,removeInfo, update} = require('../controller/infoController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:infoId', auth, admin, update)
router.delete('/:infoId', auth, admin, removeInfo)
module.exports = router;