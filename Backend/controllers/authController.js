
const User = require("../Model/userModel");
const bcrypt = require("")
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
  
        if (!userExists) {
            return res.status(400).json({ msg: "User doesn't exist" }); 
        }
        return res.status(200).json({msg: "User signed "})
        
    } catch (error) {
        console.error("Error in /login-info:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  const userCreate = async (req ,  res)=>{
      try{
          const {name ,  email , password} =  req.body;
          const userExists = await User.findOne({email});
          if(userExists){
            return res.status(400).json({msg : "User Aleady exists"});
          }
          
          const newUser = await User.create({
             name : name,
             email : email,
             password : password
          })
          return res.status(200).json({msg : `Use Registerd...`});
        }
        catch(err){
             res.status(500).json({msg : "Error Occured..."});
        }
  }
  module.exports = {userLogin , userCreate}