const mongoose = require ('mongoose');
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
    password: {  // ✅ FIXED: Removed `lowercase: true`
        type: String,
        required: true,
        trim: true, 
        minLength: 8 
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
