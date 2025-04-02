
const User = require("../Model/userModel");
const argon2 = require("argon2");
const nodemailer = require('nodemailer');
const otpStore = new Map();
function validEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const transport = nodemailer.createTransport({
        service: "gmail",
        auth : {
            user : "suryaprataps471@gmail.com",
            pass : "krsb hbmy gviu ycdt"
        }
});

const userLogin = async (req, res) => {
  try {
      const { email, password} = req.body;
      const userExists = await User.findOne({ email });
      if (!userExists) {
          return res.status(400).json({ msg: "User doesn't exist" });
      }
      const isMatch = await argon2.verify(userExists.password , password);
      if (!isMatch) {
          return res.status(400).json({ msg: "Wrong Password" });
      }

      return res.status(200).json({ msg: "User signed in"  , name : userExists.name , email : userExists.email});

  } catch (error) {
      console.error("Error in /login:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};


const sendOtp = async(req , res) =>{
  const {email} = req.body;
  if(!email){
   return   res.status(400).json({msg : "Email is required"});
  }
   const gotp = Math.floor(100000 + Math.random() * 900000);
   const expiresAt = Date.now() + 5 * 60 * 1000;
   otpStore.set(email  , {gotp , expiresAt});
   console.log(otpStore);
  const mailOptions = {
      from : "suryaprataps471@gmail.com",
      to : email,
      subject : "Email verification",
      text : `Your otp code is ${gotp}`
  };
  try{
      await transport.sendMail(mailOptions);
      
      res.status(200).json({msg : "OTP sent successfully"});
 }
 catch(err){
       console.log(err)
      res.status(500).json({msg : "failed to send otp"});
 }

}
  const userCreate = async (req ,  res)=>{
      try{
          const {name ,  email , password , otp} =  req.body;
          const userExists = await User.findOne({email});
          const otpData = otpStore.get(email);
          if(otpData.gotp !== Number(otp)){
            console.log(otpData.gotp);
            console.log(otp);
            return res.status(400).json({msg : "Wrong OTP"});
          }
          if(otpData.expiresAt< Date.now()){
            return res.status(400).json({msg : "OTP expired"});
          }
          if(userExists){
            return res.status(400).json({msg : "User Aleady exists"});
          }
          if(!validEmail(email)){
            return res.status(400).json({msg : "Invalid Email"});
          }
          let hash;
        try {
            hash = await argon2.hash(password);
        } catch (hashError) {
            console.error("Password Hashing Error:", hashError);
            return res.status(500).json({ msg: "Error Occurred During Password Hashing" });
        }

          const newUser = await User.create({
             name : name,
             email : email,
             password : hash,
          })
          return res.status(200).json({msg : `Use Registerd...`});
        }
        catch(err){
            console.log(err);
             res.status(500).json({msg : "Error Occured..."});
        }
  }

  module.exports = {userLogin , userCreate,sendOtp};