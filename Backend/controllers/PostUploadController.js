const Post = require('../Model/Post');
const User = require('../Model/userModel');
const UploadPost = async (req,res)=>{
   try{
      if(!req.file){
        res.status(400).json({msg : "No file uploaded"});
        return ;
      }
      const userId = req.params.userId;
      const filePath = `uploads/${req.file.filename}`; 
      const addPost = await Post.create({
        title : req.body.title,
        content : req.body.content,
        category : req.body.category,
        image : filePath,
        author : userId
      })
      await User.findByIdAndUpdate(userId , {
        $inc: { postCount: 1 }
      })
      return res.status(200).json({msg : "Post Uploaded Successfully"});
   }
   catch(err){
    console.error( err);
    res.status(500).json({ msg: "Internal server error" });
   }
}
module.exports = {UploadPost};