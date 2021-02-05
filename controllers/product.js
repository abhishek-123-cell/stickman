var Iphone=require("../models/iphone"),
    Ipod=require("../models/ipod"),
    Iwatch =require("../models/iwatch"),
    Admin =require("../models/admin"),
    Enquiry =require("../models/enquiry"),
    Order=require("../models/order"),
    Pincode =require("../models/pincode");
const iphone = require("../models/iphone");

module.exports={
    f1uProduct(req,res){
        if(req.params.type=="iphone"){
            Iphone.find({}).sort({_id:-1}).exec((err,products)=>{
                if(err){
                    console.log(err);
                    res.redirect("/error");
                }else{
                    products.forEach((p)=>{
                        p.variants=p.variants.filter((v)=>{
                            return v.isInStock==true;
                        })
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
                            if(req.signedCookies.cart){
                                res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                            }else{
                                res.render("product",{products:products,type:req.params.type,cart:[],cart_total:cart_total,pincodes:pin.codes});
                            }
                            // res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                        }
                    })
                    // res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total});
                }
            })
        }else if(req.params.type=="iwatch"){
            
            Iwatch.find({}).sort({_id:-1}).exec((err,products)=>{
                if(err){
                    console.log(err);
                    res.redirect("/error");
                }else{
                    // console.log("hello")
                    var cart_total=0;
                    if(req.signedCookies['cart']){
                        req.signedCookies.cart.forEach((c)=>{
                            cart_total+=c.price*c.quantity;
                        })
                    }else{
                      
                        // console.log(products[0].variants.length)
                        var cart=[];
                            JSON.stringify(cart);
                            // console.log(cart);
                            res.cookie('cart', cart,{signed:true});
                    }
                    products.forEach((p)=>{
                        p.variants=p.variants.filter((v)=>{
                            return v.isInStock==true;
                        })
                        
                    })
                    Pincode.findOne({},(err,pin)=>{
                        if(err){
                            console.log(err);
                            res.redirect("/error")
                        }else{
                            // console.log(pr)
                            if(req.signedCookies.cart){
                                res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                            }else{
                                res.render("product",{products:products,type:req.params.type,cart:[],cart_total:cart_total,pincodes:pin.codes});
                            }
                            // res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                        }
                    })
                    // res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total});
                }
            })
        }else if(req.params.type=="ipod"){
            Ipod.find({}).sort({_id:-1}).exec((err,products)=>{
                if(err){
                    console.log(err);
                    res.redirect("/error");
                }else{
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
                                res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                            }else{
                                res.render("product",{products:products,type:req.params.type,cart:[],cart_total:cart_total,pincodes:pin.codes});
                            }
                            // res.render("product",{products:products,type:req.params.type,cart:req.signedCookies.cart,cart_total:cart_total,pincodes:pin.codes});
                        }
                    })
                    
                }
            })
        }else{
            req.flash("error","Invalid url")
            res.redirect("/");
        }
    },

}