const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./Model/db");
const path = require("path");
const authRoute = require('./Router/auth');
const uploadRoute = require('./Router/upload');
const BioRouter = require('./Router/bio');
const PostModel = require('./Model/Post');
const User = require('./Model/userModel');
const mongoose = require('mongoose')
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:  "http://localhost:5173",
  credentials: true,
}))

const PORT = process.env.PORT;
app.get('/getfollowingstatus' , async(req,res)=>{
   const {followerid , followeeId} = req.query;
   try{
    const Userserach = await User.findById(followerid);
    const isFollowing = Userserach.following.includes(followeeId);
    return res.status(200).json({isFollowing});
   }
   catch(err){
    return res.status(500).json({msg : "Not able to fetch details"});
   }
})
app.put('/updatefollower', async (req, res) => {
  const { followerid , followeeId, update } = req.query;

  try {
  
    if (update === "1") {
      await User.findByIdAndUpdate(followerid, { $addToSet: { following: followeeId } });
      await User.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerid } });
    } else if (update === "-1") {
      await User.findByIdAndUpdate(followerid, { $pull: { following: followeeId } });
      await User.findByIdAndUpdate(followeeId, { $pull: { followers: followerid } });
    }
    res.status(200).json({ msg: "Follower count updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating follower count." });
  }
});
app.get('/userprofile/info/:userid', async (req, res) => {
  try {
    const userid = req.params.userid;
    const userinfo = await User.findById(userid);
    if (!userinfo) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({userinfo , followerslength : userinfo.followers.length , followinglength : userinfo.following.length}); 
  } catch (err) {
    res.status(500).json({ msg: "Error Fetching data" });
  }
});
app.get('/allposts', async (req, res) => {
  try {
    const { userid ,c} = req.query;

    let posts;
    if(c){
      posts = await PostModel.find({category : c}).populate('author');
      
      if(!posts){
        return res.status(400).json({msg : "Error fetching Posts"});
      }
      return  res.status(200).json({ posts });
    }
    if (!userid) {
      posts = await PostModel.find().populate('author');
      if(!posts){
        return res.status(400).json({msg : "Error fetching Posts"});
      }
      return  res.status(200).json({ posts });
    } else {
      posts = await PostModel.find({ author: userid }).populate('author');
      if(!posts){
        return res.status(400).json({msg : "Error fetching Posts"});
      }
      return  res.status(200).json({ posts });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching posts" });
  }
});

app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist", "index.html"));
});
app.use('/auth',authRoute);
app.use('/uploadpic',uploadRoute);
app.use('/changebio',BioRouter);


app.listen(PORT, () => {
  console.log(path.join(__dirname ));
  connectDb();
  console.log(`Server is running on port... ${PORT}`);
});

