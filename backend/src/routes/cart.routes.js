const express = require('express');
const router = express.Router();
const {protect}=require("../middlewares/auth.middleware");
const CartController=require("../controllers/cart.controller")

router.post('/',protect, CartController.addtocart);
router.post('/fast',protect, CartController.addtocartfast);
router.get('/',protect, CartController.getcart);
router.post('/delete',protect, CartController.deleteCartItem);
router.post('/update',protect, CartController.updateCartItemCount);


module.exports = router;