const router = require('express').Router();
const articleModules = require('../../modules/article/articleController');
const fileUpload     = require('../../helper/upload.helper')('public/thumbnail/');
const uploader        = fileUpload.uploader;


router.post('/post',uploader.single('file'),articleModules.postArticle);
router.get('/all',articleModules.getArticles);

module.exports = router;