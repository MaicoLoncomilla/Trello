const { Router } = require('express');
const router = Router();

router.use('/dashboard', require('./dashboard'))
router.use('/imageTask', require('./imageTask'))
router.use('/comment', require('./comment'))
router.use('/column', require('./column'))
router.use('/image', require('./image'))
router.use('/user', require('./user'))
router.use('/task', require('./task'))

module.exports = router;
