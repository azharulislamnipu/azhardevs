const router = require('express').Router();
const {create, update, getAll, remove} = require('../controller/bannerController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
const {upload,uploadany,uploadfields} = require('../utils/multer');
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/', auth, admin, upload('image'), create);
router.get('/',  getAll);
// router.get('/:bannerId', auth, getSingleTransaction)
router.put('/:bannerId', auth, admin, upload('image'), update)
router.delete('/:bannerId', auth, admin, remove)

module.exports = router;