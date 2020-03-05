const router = require('express').Router();
const {create, getAll, getAboutDetails, removeAbout, update} = require('../controller/aboutController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
const {upload,uploadany} = require('../utils/multer');
//get all authenicate user
// router.get('/auth', authnicateuser);
 
//get all authenicate user
// router.get('/auth', authnicateuser);
router.post('/',auth, admin, upload('about_image'), create);
router.get('/',  getAll);
// router.get('/:aboutId', getAboutDetails);
router.put('/:aboutId', auth, admin, upload('about_image'), update);
router.delete('/:aboutId', auth, admin, removeAbout);
module.exports = router;