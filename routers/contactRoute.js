const router = require('express').Router();
const {create, getAll, removeContact, update} = require('../controller/contactController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');


router.post('/', create);
router.get('/',  auth, admin, getAll);
router.put('/:contactId', auth, admin, update)
router.delete('/:contactId', auth, admin, removeContact)
module.exports = router;