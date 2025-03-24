const express = require('express');
const router = express.Router();
const {protect}=require("../middlewares/auth.middleware");
const OrderController=require("../controllers/order.controller")

router.post('/checkout',protect, OrderController.checkout);
router.post('/success',protect, OrderController.success);

module.exports = router;