var Iphone=require("../models/iphone"),
    Ipod=require("../models/ipod"),
    Iwatch =require("../models/iwatch"),
    Admin =require("../models/admin"),
    Enquiry =require("../models/enquiry"),
    Order=require("../models/order"),
    Pincode =require("../models/pincode");


module.exports={
    f1uItem(req,res){
        console.log("hello")
        if (req.params.type == "iphone") {
            Iphone.findOne({ pid: req.params.pid }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        phone.variants=phone.variants.filter((v)=>{
                            return v.isInStock==true;
                        })
                        var cart_total=0;
                        if(req.signedCookies['cart']){
                            req.signedCookies.cart.forEach((c)=>{
                                cart_total+=c.price*c.quantity;
                            })
                        }else{
                            var cart=[];
                                JSON.stringify(cart);
                                // console.log(cart);
                                res.cookie('cart', cart,{signed:true});
                        }
                        Pincode.findOne({},(err,pin)=>{
                            if(err){
                                console.log(err);
                                res.redirect("/error")
                            }else{
                                // console.log(phone.variants.length)
                                if(req.signedCookies.cart){
                                    res.render("product_details",{product:phone,type:"iphone",cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                                }else{
                                    res.render("product_details",{product:phone,type:"iphone",cart:[],cart_total:cart_total,pincodes:pin.codes});
                                }
                                
                            }
                        })
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else if (req.params.type == "iwatch") {
            // console.log("hello")
            Iwatch.findOne({ pid: req.params.pid }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        phone.variants=phone.variants.filter((v)=>{
                            return v.isInStock==true;
                        })
                        var cart_total=0;
                        if(req.signedCookies['cart']){
                            req.signedCookies.cart.forEach((c)=>{
                                cart_total+=c.price*c.quantity;
                            })
                        }else{

                            var cart=[];
                                JSON.stringify(cart);
                                // console.log(cart);
                                res.cookie('cart', cart,{signed:true});
                        }
                        Pincode.findOne({},(err,pin)=>{
                            if(err){
                                console.log(err);
                                res.redirect("/error")
                            }else{
                                console.log(phone.variants.length)
                                if(req.signedCookies.cart){
                                    res.render("product_details",{product:phone,type:"iwatch",cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                                }else{
                                    res.render("product_details",{product:phone,type:"iwatch",cart:[],cart_total:cart_total,pincodes:pin.codes});
                                }
                                // res.render("product_details",{product:phone,type:"iwatch",cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                            }
                        })
                    } else {
                        res.redirect("back");
                    }
                }
            })

        } else if (req.params.type == "ipod") {
            console.log("hello")
            Ipod.findOne({ pid: req.params.pid,isInStock:true }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        console.log("hey")
                        var cart_total=0;
                        if(req.signedCookies['cart']){
                            req.signedCookies.cart.forEach((c)=>{
                                cart_total+=c.price*c.quantity;
                            })
                        }else{
                            var cart=[];
                                JSON.stringify(cart);
                                // console.log(cart);
                                res.cookie('cart', cart,{signed:true});
                        }
                        Pincode.findOne({},(err,pin)=>{
                            if(err){
                                console.log(err);
                                res.redirect("/error")
                            }else{
                                if(req.signedCookies.cart){
                                    res.render("product_details",{product:phone,type:"ipod",cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                                }else{
                                    res.render("product_details",{product:phone,type:"ipod",cart:[],cart_total:cart_total,pincodes:pin.codes});
                                }
                                // res.render("product_details",{product:phone,type:"ipod",cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                            }
                        })
                       
                    } else {
                       
                        res.redirect("back");
                    }
                }
            })

        } else {
            req.flash("error","Invalid url")
            res.redirect("/");
        }
 
    }
}