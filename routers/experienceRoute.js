const router = require('express').Router();
const {create,getAll, update,remove} = require('../controller/experienceController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:experienceId', auth, admin, update)
router.delete('/:experienceId', auth, admin, remove)
module.exports = router;