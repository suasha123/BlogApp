
const User = require("../Model/userModel");

const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.params.userId;
        const filePath = `uploads/${req.file.filename}`; 
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic : filePath },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Upload successful",
            profilePic: updatedUser.profilePic
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};

module.exports = { uploadProfilePic };
