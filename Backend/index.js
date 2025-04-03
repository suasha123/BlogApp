const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./Model/db");
const path = require("path");
const authRoute = require('./Router/auth');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:  "http://localhost:5173",
  credentials: true,
}))


const PORT = process.env.PORT;

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

