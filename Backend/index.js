const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./Model/db");
const path = require("path");
const authRoute = require('./Router/auth')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:  "http://localhost:5174",
  credentials: true,
}))
/*{
  origin:  "http://localhost:5173",
  credentials: true,
}*/

const PORT = process.env.PORT;
/*async function userCreate() {
  try{
    const newuser = new User({
      name : "Surya Pratap Singh",
      email : "suryaprataps471@gmail.com",
      password : "Surya8948&",
    })
    await newuser.save();
    console.log("user saved");
  }
  catch(error){
     console.log("Error while saving");
  }
}*/
app.use(express.static(path.join(__dirname, "../Frontend/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist", "index.html"));
});

app.use('/auth',authRoute);
app.listen(PORT, () => {
  console.log(path.join(__dirname ));
  connectDb();
  console.log(`Server is running on port... ${PORT}`);
});

