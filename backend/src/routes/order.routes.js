const express = require('express');
const router = express.Router();
const {protect, admin}=require("../middlewares/auth.middleware");
const OrderController=require("../controllers/order.controller")

router.post('/checkout',protect, OrderController.checkout);
router.post('/success',protect, OrderController.success);
router.get('/',admin, OrderController.getallorders);
router.get('/myorders',protect, OrderController.getmyorders);
router.post('/updatestatus',protect, OrderController.updateStatus);

module.exports = router;