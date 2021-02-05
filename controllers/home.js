var Iphone = require("../models/iphone"),
    Ipod = require("../models/ipod"),
    Iwatch = require("../models/iwatch"),
    Admin = require("../models/admin"),
    Enquiry = require("../models/enquiry"),
    Order = require("../models/order"),
    { sendSmsAll, sendSms } = require("../msg91/sendmsg"),
    { nodemailerSendEmail, nodemailerSendEmailAll } = require("../nodemailer/nodemailer"),
    crypto = require("crypto");
Pincode = require("../models/pincode");
const e = require("express");


// Order.findOne({oid:63992},(err,order)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(order);
//         // order.isPaid = true;
//         // order.save();
//         // var cart = [];
//         // JSON.stringify(cart);
//         // // res.cookie('cart', cart, { signed:true });
//         // var sms = [];
//         // var mail = [];
//         // order.products.forEach((p)=>{
//         //     // console.log("hiiii")
//         //     if(p.type=="Phone"){
//         //         console.log("hello")
//         //         Iphone.findOne({pid:p.product_id},(err,phone)=>{
//         //             if(err){
//         //                 console.log(err);
//         //                 // req.flash("error","Database Error")
//         //                 // res.redirect("/")
//         //             }else{
//         //                 if(phone){
                            
//         //                     phone.variants.forEach((v)=>{
//         //                         var desc="(" + v.storage+ ")";
//         //                         console.log(desc)
//         //                         if(p.description==desc){
//         //                             v.quantity-=p.quantity;
//         //                             console.log("mila")

//         //                         }
//         //                     })
//         //                     phone.save();
//         //                 }
//         //             }
//         //         })
//         //     }else if(p.type=="Watch"){
//         //         Iwatch.findOne({pid:p.product_id},(err,phone)=>{
//         //             if(err){
//         //                 console.log(err);
//         //                 // req.flash("error","Database Error")
//         //                 // res.redirect("/")
//         //             }else{
//         //                 if(phone){
                            
//         //                     phone.variants.forEach((v)=>{
//         //                         var desc="(" + v.size+","+v.type+ ")";
//         //                         if(p.description==desc){
//         //                             v.quantity-=p.quantity;

//         //                         }
//         //                     })
//         //                     phone.save();
//         //                 }
//         //             }
//         //         })
//         //     }else{
//         //         Ipod.findOne({pid:p.product_id},(err,phone)=>{
//         //             if(err){
//         //                 console.log(err);
//         //                 // req.flash("error","Database Error")
//         //                 // res.redirect("/")
//         //             }else{
//         //                 if(phone){
//         //                    phone.quantity-=p.quantity;
//         //                     phone.save();
//         //                 }
//         //             }
//         //         })

//         //     }
//         // })
//         // mail.push({
//         //     mail: order.email,
//         //     sub: "Your Order At Marvans Mobile",
//         //     html: "<p><b>Thank You for your purchase at Marvans Mobile .</b></p>" +
//         //         "<p>OrderId: " + order.oid + "</p>" +
//         //         "<p>Total Amount: " + order.total_paid + "</p>" +
//         //         "<p>For more details please visit the website and track your order.You will get a confirmation call soon</p>"
//         // })
//         // sms.push({
//         //     mobile: order.mobile,
//         //     message: "Thank you for your purchase at Marvans Mobile. Your OrderId is " + order.oid +". Order Amount:"+order.total_paid+ ".\nPlease check your mail or visit the website for your order details."
//         // })
//         // Admin.findOne({}, (err, admin) => {
//         //     if (err) {
//         //         res.redirect("/error");
//         //     } else {
//         //         console.log("Admin")
//         //         mail.push({
//         //             mail: admin.email,
//         //             sub: "New Order Placed",
//         //             html:"<p><b>New Order Placed.</b></p>" +
//         //             "<p>OrderId: " + order.oid + "</p>" +
//         //             "<p>Customer: " + order.username + "</p>" +
//         //             "<p>Mobile No: " + order.mobile + "</p>" +
//         //             "<p>Order Amount: " + order.total_paid + "</p>" +
//         //             "<p>For more details please visit the admin panel.</p>"
//         //         })
//         //         mail.push({
//         //             mail: "ankit@stickmanservices.com",
//         //             sub: "New Order Placed",
//         //             html:"<p><b>New Order Placed.</b></p>" +
//         //             "<p>OrderId: " + order.oid + "</p>" +
//         //             "<p>Customer: " + order.username + "</p>" +
//         //             "<p>Mobile No: " + order.mobile + "</p>" +
//         //             "<p>Order Amount: " + order.total_paid + "</p>" +
//         //             "<p>For more details please visit the admin panel.</p>"
//         //         })
//         //         sms.push({
//         //             mobile: admin.mobile,
//         //             message: "There is a new order placed with orderId: " + order.oid +".\nCustomer:"+order.username+"Mobile:"+order.mobile+"Order Amount:"+order.total_paid+ ".\nPlease visit the admin panel for more details."
//         //         })
//         //         nodemailerSendEmailAll(mail, (res) => {
//         //             console.log(res);
//         //             // console.log("hello");
//         //         });
//         //         // console.log("admin")
//         //         sendSmsAll(sms);
//         //     }
//         // })
//     }
// })

module.exports = {
    f1uHome(req, res) {
        var cart_total = 0;
        if (req.signedCookies['cart']) {
            req.signedCookies.cart.forEach((c) => {
                cart_total += c.price * c.quantity;
            })
        } else {
            var cart = [];
            JSON.stringify(cart);
            // console.log(cart);
            res.cookie('cart', cart, { signed:true });
        }

        Pincode.findOne({}, (err, pin) => {
            if (err) {
                console.log(err);
                res.redirect("/error")
            } else {
                if (req.signedCookies.cart) {
                    res.render("index", { cart: req.signedCookies.cart, cart_total: cart_total, pincodes: pin.codes,img_url:pin.add_image.url });
                } else {
                    res.render("index", { cart: [], cart_total: cart_total, pincodes: pin.codes,img_url:pin.add_image.url });
                }

            }
        })

    },

    f2uHome(req, res) {
        res.render("error");
    },

    f3uHome(req, res) {
        res.render("not-found");
    },

    f4uHome(req, res) {
        var cart_total = 0;
        if (req.signedCookies['cart']) {
            req.signedCookies.cart.forEach((c) => {
                cart_total += c.price * c.quantity;
            })
        } else {
            var cart = [];
            JSON.stringify(cart);
            // console.log(cart);
            res.cookie('cart', cart, { signed:true });
        }

        Pincode.findOne({}, (err, pin) => {
            if (err) {
                console.log(err);
                res.redirect("/error")
            } else {
                if (req.signedCookies.cart) {
                    res.render("support", { cart: req.signedCookies.cart, cart_total: cart_total, pincodes: pin.codes });
                } else {
                    res.render("support", { cart: [], cart_total: cart_total, pincodes: pin.codes });
                }

            }
        })
    },

    f5uHome(req, res) {
        if (req.body.customer == "Yes") {
            var query = {
                username: req.body.username,
                isCustomer: true,
                type: req.body.type,
                subject: req.body.subject,
                product: req.body.product,
                city: req.body.city,
                mobile: req.body.mobile,
                orderid: req.body.orderid,
                message: req.body.message,

            }
        } else {
            var query = {
                username: req.body.username,
                isCustomer: false,
                type: req.body.type,
                subject: req.body.subject,
                product: req.body.product,
                city: req.body.city,
                mobile: req.body.mobile,
                orderid: req.body.orderid,
                message: req.body.message,

            }
        }

        Enquiry.create(query, (err, query) => {
            if (err) {
                console.log(err);
                res.redirect("error");
            } else {
                var sms = [];
                var mail = [];
                sms.push({
                    mobile: query.mobile,
                    message: "We have successfully received your query and our team with respond to you within 48 hours."
                })
                Admin.findOne({}, (err, admin) => {
                    if (err) {
                        res.redirect("/error");
                    } else {
                        console.log("Admin")
                        mail.push({
                            mail: admin.email,
                            sub: "New Query",
                            html:"<p><b>New Contact Query.</b></p>" +
                            "<p>Customer: " + query.username + "</p>" +
                            "<p>Mobile No: " + query.mobile + "</p>" +
                            "<p>Subject: " + query.subject+ "</p>" +
                            "<p>For more details please visit the admin panel.</p>"
                        })
                        mail.push({
                            mail: "ankit@stickmanservices.com",
                            sub: "New Query",
                            html:"<p><b>New Contact Query.</b></p>" +
                            "<p>Customer: " + query.username + "</p>" +
                            "<p>Mobile No: " + query.mobile + "</p>" +
                            "<p>Subject: " + query.subject+ "</p>" +
                            "<p>For more details please visit the admin panel.</p>"
                        })
                        nodemailerSendEmailAll(mail, (res) => {
                            console.log(res);
                            console.log("hello");
                        });
                        
                        req.flash("success","Successful");
                        res.redirect("/");

                    }
                })
                
            }
        })
    },

    f6uHome(req, res) {
        res.redirect("/order-details/" + req.body.orderid);
    },

    f7uHome(req, res) {
        console.log(req.params.oid)
        Order.findOne({ oid: Number(req.params.oid),isPaid:true }, (err, order) => {
            if (err) {
                console.log(err);
                res.redirect("/error");
            } else {
                if (order) {
                    var cart_total = 0;
                    if (req.signedCookies['cart']) {
                        req.signedCookies.cart.forEach((c) => {
                            cart_total += c.price * c.quantity;
                        })
                    } else {
                        var cart = [];
                        JSON.stringify(cart);
                        // console.log(cart);
                        res.cookie('cart', cart, { signed:true });
                    }

                    Pincode.findOne({}, (err, pin) => {
                        if (err) {
                            console.log(err);
                            res.redirect("/error")
                        } else {
                            if (req.signedCookies.cart) {
                                res.render("order_details", { cart: req.signedCookies.cart, cart_total: cart_total, pincodes: pin.codes, order: order });
                            } else {
                                res.render("order_details", { cart: [], cart_total: cart_total, pincodes: pin.codes, order: order });
                            }

                        }
                    })
                } else {
                    res.redirect("back");
                }
            }
        })
    },

    f8uHome(req, res) {
        // res.send(req.body);
        var data = req.body;
        signatureData = data["orderId"] + data["orderAmount"] + data["referenceId"] +
            data["txStatus"] + data["paymentMode"] + data["txMsg"] + data["txTime"];
        var secretKey = process.env.cashfree_secret;
        var computedSignature = crypto.createHmac('sha256', secretKey).update(signatureData).digest('base64');
        var signature = req.body.signature;
        if (computedSignature == signature) {
            // console.log("Successful");
            if (req.body.txStatus == "SUCCESS") {
                Order.findOne({ oid: req.body.orderId }, (err, order) => {
                    if (err) {
                        console.log(err);
                        res.redirect("/errror");
                    } else {
                        if (order) {
                            order.isPaid = true;
                            order.save();
                            var cart = [];
                            JSON.stringify(cart);
                            res.cookie('cart', cart, { signed:true });
                            var sms = [];
                            var mail = [];
                            order.products.forEach((p)=>{
                                console.log("hiiii")
                                if(p.type=="Phone"){
                                    console.log("hello")
                                    Iphone.findOne({pid:p.product_id},(err,phone)=>{
                                        if(err){
                                            console.log(err);
                                            req.flash("error","Database Error")
                                            res.redirect("/")
                                        }else{
                                            if(phone){
                                                
                                                phone.variants.forEach((v)=>{
                                                    var desc="(" + v.storage+ ")";
                                                    console.log(desc)
                                                    if(p.description==desc){
                                                        v.quantity-=p.quantity;
                                                        console.log("mila")

                                                    }
                                                })
                                                phone.save();
                                            }
                                        }
                                    })
                                }else if(p.type=="Watch"){
                                    Iwatch.findOne({pid:p.product_id},(err,phone)=>{
                                        if(err){
                                            console.log(err);
                                            req.flash("error","Database Error")
                                            res.redirect("/")
                                        }else{
                                            if(phone){
                                                
                                                phone.variants.forEach((v)=>{
                                                    var desc="(" + v.size+","+v.type+ ")";
                                                    if(p.description==desc){
                                                        v.quantity-=p.quantity;

                                                    }
                                                })
                                                phone.save();
                                            }
                                        }
                                    })
                                }else{
                                    Ipod.findOne({pid:p.product_id},(err,phone)=>{
                                        if(err){
                                            console.log(err);
                                            req.flash("error","Database Error")
                                            res.redirect("/")
                                        }else{
                                            if(phone){
                                               phone.quantity-=p.quantity;
                                                phone.save();
                                            }
                                        }
                                    })

                                }
                            })
                            mail.push({
                                mail: order.email,
                                sub: "Your Order At Marvans Mobile",
                                html: "<p><b>Thank You for your purchase at Marvans Mobile .</b></p>" +
                                    "<p>OrderId: " + order.oid + "</p>" +
                                    "<p>Total Amount: " + order.total_paid + "</p>" +
                                    "<p>For more details please visit the website and track your order.You will get a confirmation call soon</p>"
                            })
                            sms.push({
                                mobile: order.mobile,
                                message: "Thank you for your purchase at Marvans Mobile. Your OrderId is " + order.oid +". Order Amount:"+order.total_paid+ ".\nPlease check your mail or visit the website for your order details."
                            })
                            Admin.findOne({}, (err, admin) => {
                                if (err) {
                                    res.redirect("/error");
                                } else {
                                    console.log("Admin")
                                    mail.push({
                                        mail: admin.email,
                                        sub: "New Order Placed",
                                        html:"<p><b>New Order Placed.</b></p>" +
                                        "<p>OrderId: " + order.oid + "</p>" +
                                        "<p>Customer: " + order.username + "</p>" +
                                        "<p>Mobile No: " + order.mobile + "</p>" +
                                        "<p>Order Amount: " + order.total_paid + "</p>" +
                                        "<p>For more details please visit the admin panel.</p>"
                                    })
                                    mail.push({
                                        mail: "ankit@stickmanservices.com",
                                        sub: "New Order Placed",
                                        html:"<p><b>New Order Placed.</b></p>" +
                                        "<p>OrderId: " + order.oid + "</p>" +
                                        "<p>Customer: " + order.username + "</p>" +
                                        "<p>Mobile No: " + order.mobile + "</p>" +
                                        "<p>Order Amount: " + order.total_paid + "</p>" +
                                        "<p>For more details please visit the admin panel.</p>"
                                    })
                                    sms.push({
                                        mobile: admin.mobile,
                                        message: "There is a new order placed with orderId: " + order.oid +".\nCustomer:"+order.username+"Mobile:"+order.mobile+"Order Amount:"+order.total_paid+ ".\nPlease visit the admin panel for more details."
                                    })
                                    nodemailerSendEmailAll(mail, (res) => {
                                        console.log(res);
                                        // console.log("hello");
                                    });
                                    // console.log("admin")
                                    sendSmsAll(sms);
                                   
                                    req.flash("success","Order Successful");
                                    res.redirect("/order-details/" + req.body.orderId);
                                }
                            })


                        } else {
                            console.log("no such order")
                            req.flash("error", "Something Went Wrong");
                            res.redirect("/");

                        }
                    }
                })
                // res.redirect("/order-details/"+req.body.orderId);

            } else if (req.body.txStatus == "FAILED") {
                Order.deleteOne({ oid: req.body.orderId }, (err) => {
                    if (err) {
                        res.redirect("/error");
                    } else {
                        Pincode.findOne({}, (err, pin) => {
                            if (err) {
                                console.log(err);
                                res.redirect("/error");
                            } else {
                                // pin.orderids.push(req.body.orderId);

                                pin.orderids = pin.orderids.filter((oid) => {
                                    return oid != Number(req.body.orderId);
                                })
                                pin.save();
                                console.log("failed")
                                req.flash("error", "PAYMENT FAILED");
                                res.redirect("/");

                            }

                        })

                    }
                })
            } else if (req.body.txStatus == "CANCELLED") {
                Order.deleteOne({ oid: req.body.orderId }, (err) => {
                    if (err) {
                        res.redirect("/error");
                    } else {
                        Pincode.findOne({}, (err, pin) => {
                            if (err) {
                                console.log(err);
                                res.redirect("/error");
                            } else {
                                // pin.orderids.push(req.body.orderId);

                                pin.orderids = pin.orderids.filter((oid) => {
                                    return oid != Number(req.body.orderId);
                                })
                                pin.save();
                                console.log("cancelled")
                                req.flash("error", "PAYMENT CANCELLED");
                                res.redirect("/");

                            }

                        })

                    }
                })
            } else {
                Order.deleteOne({ oid: req.body.orderId }, (err) => {
                    if (err) {
                        res.redirect("/error");
                    } else {
                        Pincode.findOne({}, (err, pin) => {
                            if (err) {
                                console.log(err);
                                res.redirect("/error");
                            } else {
                                // pin.orderids.push(req.body.orderId);

                                pin.orderids = pin.orderids.filter((oid) => {
                                    return oid != Number(req.body.orderId);
                                })
                                pin.save();
                                console.log("erroir")
                                req.flash("error", "PAYMENT FAILED");
                                res.redirect("/");

                            }

                        })

                    }
                })
            }
        } else {
            Order.deleteOne({ oid: req.body.orderId }, (err) => {
                if (err) {
                    res.redirect("/error");
                } else {
                    Pincode.findOne({}, (err, pin) => {
                        if (err) {
                            console.log(err);
                            res.redirect("/error");
                        } else {
                            // pin.orderids.push(req.body.orderId);

                            pin.orderids = pin.orderids.filter((oid) => {
                                return oid != Number(req.body.orderId);
                            })
                            pin.save();
                            console.log("invalid signature")
                            req.flash("error", "PAYMENT FAILED");
                            res.redirect("/");

                        }

                    })
                }
            })

        }

    }
}