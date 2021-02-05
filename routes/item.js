const express = require("express");
var router = express.Router({ mergeParams: true }),
    {f1uItem}=require("../controllers/item");

// @route to detail of a product
router.get("/:type/:pid",f1uItem);



module.exports=router;