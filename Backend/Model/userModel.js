const mongoose = require ('mongoose');
const { type } = require('os');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {  
        type: String,
        required: true,
        trim: true, 
        minLength: 8 
    },
    profilepic : {
      type : String,
      default : "uploads/default.png"
    },
    bio : {
    type : String,
    default : "Blogger"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
