const router = require('express').Router();
const {create, getAll, remove, update} = require('../controller/cvController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');
const {upload,uploadany} = require('../utils/multer');


router.post("/", auth, admin, upload('cv'), create );

 router.get('/', getAll);
router.put('/:cvId', auth, admin, upload('cv'), update)
 router.delete('/:cvId', auth, admin, remove)
module.exports = router;


