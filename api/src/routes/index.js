const { Router } = require('express');
const router = Router();

router.use('/dashboard', require('./dashboard'))
router.use('/user', require('./user'))
router.use('/task', require('./task'))
router.use('/column', require('./column'))

module.exports = router;
