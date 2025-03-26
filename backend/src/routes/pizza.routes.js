const express = require('express');
const router = express.Router();
const {protect}=require("../middlewares/auth.middleware");
const PizzaController=require("../controllers/pizza.controller")

router.get('/',protect, PizzaController.getrandom);

module.exports = router;