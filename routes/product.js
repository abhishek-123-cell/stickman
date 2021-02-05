const express = require("express");
var router = express.Router({ mergeParams: true }),
    {f1uProduct}=require("../controllers/product");


// @route to products page
router.get("/:type",f1uProduct);

module.exports=router;
