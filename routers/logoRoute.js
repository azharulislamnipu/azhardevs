const router = require('express').Router();
const {create, getAll, remove, update} = require('../controller/logoController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
const {upload,uploadany} = require('../utils/multer');


router.post("/", auth, admin, upload('logo'), create );

 router.get('/', getAll);
router.put('/:logoId', auth, admin, upload('logo'), update)
 router.delete('/:logoId', auth, admin, remove)
module.exports = router;