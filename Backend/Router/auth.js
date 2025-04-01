const express = require('express');
const router = express.Router();
const {userLogin,userCreate,sendOtp} = require('../controllers/authController');
router.post('/login-info',userLogin);
router.post('/sign-user',userCreate);
router.post('/otp-generate',sendOtp);
module.exports = router;