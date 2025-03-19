const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String , 
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required  : true,
        trim : true,
        lowercase : true,
        minLength : 8 
    }
})

const User = mongoose.model("User" , userSchema);
module.exports = User;