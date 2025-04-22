const mongoose = require('mongoose');
async function connectDb() {
    try {
        await mongoose.connect('mongodb+srv://suryaprataps471:surya8948@cluster0.slk85.mongodb.net/blogDb?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database Connected");
    } catch (err) {
        console.log("Error connecting Database:", err.message);
        process.exit(1);
    }
}

module.exports = connectDb;
