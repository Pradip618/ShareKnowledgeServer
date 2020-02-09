const router = require('express').Router();
const article = require('./api/article')

router.use('/article',article);

module.exports = router;