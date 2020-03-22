const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articleSchema = new schema({
    title: { type:String, required: true },
    description: {type:String, required:true },
    tags: {type:[String] },
    thumbnail:{ type: schema.Types.Mixed }
});

module.exports = mongoose.model('article', articleSchema);