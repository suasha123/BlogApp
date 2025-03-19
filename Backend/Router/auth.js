const express = require('express');
const router = express.Router();
const {userLogin,userCreate} = require('../controllers/authController');
router.post('/login-info',userLogin);
router.post('/sign-user',userCreate);
module.exports = router;