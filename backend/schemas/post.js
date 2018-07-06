var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    Post:String,
    Email:String,
    time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('posts',postSchema);