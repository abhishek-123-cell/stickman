const express = require("express");
var router = express.Router({ mergeParams: true }),
    {f1uCart,f2uCart,f3uCart,f4uCart, f5uCart}=require("../controllers/cart");


// add to cart
router.post("/add/:type/:pid",f1uCart);

// delete from cart
router.post("/delete/:type/:pid",f2uCart);

// checkout page
router.get("/checkout",f3uCart);

// order a cart
router.post("/order",f4uCart);

// confirm a order
router.get("/proceed-to-payment/:oid",f5uCart)



module.exports=router;