const router = require('express').Router();
const articleModules = require('../../modules/article/articleController');


router.get('/post',articleModules.postArticle);

module.exports = router;