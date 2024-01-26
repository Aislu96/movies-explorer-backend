const router = require('express').Router();
const { getUser, patchMe } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { patchMeValidator } = require('../middlewares/validator');

router.get('/me', auth, getUser);
router.patch('/me', patchMeValidator, auth, patchMe);

module.exports = router;
