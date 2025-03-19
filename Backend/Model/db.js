const mongoose = require ('mongoose');

async function connectDb() {
     try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
        console.log("Database Connected");
     }
     catch(err){
        console.log("Error connecting Database");
        process.exit(1);
     }
}

module.exports = connectDb;