const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Use a default port if PORT is not set
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port... ${PORT}`);
});
