const mongoose = require ('mongoose');
/*const PostModel = require('./Post');*/
async function connectDb() {
     try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
        console.log("Database Connected");
        //const posts = await PostModel.find();
        //console.log("📦 All Posts:", posts);
     }
     catch(err){
        console.log("Error connecting Database");
        process.exit(1);
     }
}

module.exports = connectDb;