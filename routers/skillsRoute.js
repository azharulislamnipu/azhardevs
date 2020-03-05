const router = require('express').Router();
const {create, getAll, remove, update} = require('../controller/skillsController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, create);
// router.get('/',auth, admin,  getAll);
router.get('/', getAll);
router.put('/:skillsId', auth, admin, update)
router.delete('/:skillsId', auth, admin, remove)
module.exports = router;