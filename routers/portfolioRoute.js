const router = require('express').Router();
const {create, getAll, removePortfolio, update} = require('../controller/portfolioController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
const {upload,uploadany,multiUpload} = require('../utils/multer');
//get all authenicate user
// router.get('/auth', authnicateuser);

router.post('/',auth, admin, uploadany(), create);
router.get('/',  getAll);
// router.get('/:aboutId', getAboutDetails);
router.put('/:portfolioId', auth, admin, uploadany(), update);
router.delete('/:portfolioId', auth, admin, removePortfolio);
module.exports = router;