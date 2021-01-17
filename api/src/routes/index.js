const { Router } = require('express');
const router = Router();

router.use('/inQueue', require('./inQueue'));

module.exports = router;
