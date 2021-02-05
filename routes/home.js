const express = require("express");
var router = express.Router({ mergeParams: true }),
    {f1uHome,f2uHome,f3uHome,f4uHome,f5uHome,f6uHome, f7uHome, f8uHome}=require("../controllers/home");

// @route to home page
router.get("/",f1uHome);

// @route to error page
router.get("/error",f2uHome);

// @route to 404 page
router.get("/not-found",f3uHome);

// @route to support page
router.get("/support",f4uHome);

// @route to submit support request
router.post("/support",f5uHome);

// @route to post order details
router.post("/order-details",f6uHome);

// @route to see order details
router.get("/order-details/:oid",f7uHome);

// @route to payment status
router.post("/payment-status",f8uHome)

module.exports=router;