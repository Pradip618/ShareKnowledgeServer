const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper')
const Article = require('./articleSchema');

let articleController = {};


articleController.postArticle = async(req,res,next) => {
    try{
        if(req.file) {
            req.file.destination =
            req.file.destination
            .split('ShareKnowledgeServer/')[1] + '/';
            
            req.file.path = req.file.path.split('ShareKnowledgeServer/')[1];
        }
        req.body.thumbnail = req.file;
        const { title, description, thumbnail} = req.body;
        Article.create({
            title,
            description,
            thumbnail
        }, msg => {
            console.log(msg,'msg');
        })
    }
    catch(err) {
        console.log(err);
        next(err);
    }
};

articleController.getArticles = async(req,res,next) => {
    try{
        const allArticles = await Article.find().select('title thumbnail');
        otherHelper.sendResponse(res,httpStatus.OK,true, allArticles,null, 'All Articles Retrieved Successfully',null)
    }
    catch(err) {
        next(err);
        console.log(err);
    }
};

module.exports = articleController;