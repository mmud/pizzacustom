const express = require('express');
const router = express.Router();
const {protect,admin}=require("../middlewares/auth.middleware");
const IngController=require("../controllers/ing.controller")

router.post('/',admin, IngController.addIng);
router.get('/',protect, IngController.getIngs);
router.post('/delete',admin, IngController.deleteIng);
router.post('/edit',admin, IngController.editIng);

module.exports = router;