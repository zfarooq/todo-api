var mongoose = require('mongoose');
var User = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
});
module.exports = { User};