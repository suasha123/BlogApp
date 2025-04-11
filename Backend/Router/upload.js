const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 
const { uploadProfilePic } = require('../controllers/uploadcontroller');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

router.post('/upload-img/:userId', upload.single('profilePic'), uploadProfilePic);

module.exports = router; 
