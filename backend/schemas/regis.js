var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var regiSchema = new Schema({
    First_Name:String,
    Last_Name:String,
    Email:String,
    Password:String,
    image:String,
    time: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users',regiSchema);