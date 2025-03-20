const express = require('express');
const router = express.Router();
const {protect}=require("../middlewares/auth.middleware");
const UserController=require("../controllers/user.controller")

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getme',protect, UserController.getme);
router.post('/verify', UserController.verify);
router.post('/resendverify', UserController.resendverify);
router.post('/forgetpassword', UserController.forgetpassword);
router.post('/resetpassword/:token', UserController.resetpassword);
router.get('/isloggedin',protect, UserController.isloggedin);

module.exports = router;