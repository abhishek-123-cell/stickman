var Iphone = require("../models/iphone"),
    Ipod = require("../models/ipod"),
    Iwatch = require("../models/iwatch"),
    Admin = require("../models/admin"),
    Enquiry = require("../models/enquiry"),
    Order = require("../models/order"),
    cookieParser = require("cookie-parser"),
    axios = require("axios"),
    crypto = require("crypto"),
    Pincode = require("../models/pincode");
const e = require("express");

module.exports = {
    f1uCart(req, res) {
        if (req.params.type == "iphone") {
            Iphone.findOne({ pid: req.params.pid }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        var iphone_variant = phone.variants.filter((v) => {
                            return v._id == req.body.variant;
                        })
                        if (req.signedCookies['cart']) {
                            console.log(req.signedCookies.cart)

                            var cart = req.signedCookies.cart;
                            var flag = 0;
                            var stop = cart.length;
                            var done = 0;
                            if (stop == 0) {
                                if (iphone_variant[0].isInStock) {
                                    cart.push({
                                        type: "iphone",
                                        name: phone.name,
                                        pid: phone.pid,
                                        vid: req.body.variant,
                                        storage: iphone_variant[0].storage,
                                        color: iphone_variant[0].color,
                                        price: iphone_variant[0].price,
                                        image: phone.gallery[0].url,
                                        quantity: Number(req.body.quantity)
                                    })
                                    JSON.stringify(cart);
                                    // console.log(cart);
                                    res.cookie('cart', cart, { signed: true });
                                    req.flash("success", "Added to cart")
                                    res.redirect("back");
                                } else {
                                    req.flash("error", "Not InStock")
                                    res.redirect("back");

                                }


                            }
                            cart.forEach((c) => {
                                if (c.type == "iphone" && c.pid == req.params.pid) {
                                    if (c.vid == req.body.variant) {

                                        c.quantity = Number(req.body.quantity) + Number(c.quantity);
                                        flag = 1;
                                    }
                                }
                                done += 1;
                                if (done == stop) {
                                    if (flag == 0) {
                                        if (iphone_variant[0].isInStock) {
                                            cart.push({
                                                type: "iphone",
                                                name: phone.name,
                                                pid: phone.pid,
                                                vid: req.body.variant,
                                                storage: iphone_variant[0].storage,
                                                color: iphone_variant[0].color,
                                                price: iphone_variant[0].price,
                                                image: phone.gallery[0].url,
                                                quantity: Number(req.body.quantity)
                                            })
                                        }

                                    }
                                    JSON.stringify(cart);
                                    // console.log(cart);
                                    res.cookie('cart', cart, { signed: true });
                                    req.flash("success", "Added to cart")
                                    res.redirect("back");
                                }
                            })






                            //    JSON.parse(req.signedCookies.cart) 
                            // console.log(cookieParser.JSONCookie(req.signedCookies.cart))
                        } else {
                            // console.log(req.signedCookies['cart'])
                            var cart = [];
                            if (iphone_variant[0].isInStock) {
                                cart.push({
                                    type: "iphone",
                                    pid: phone.pid,
                                    name: phone.name,
                                    vid: req.body.variant,
                                    storage: iphone_variant[0].storage,
                                    color: iphone_variant[0].color,
                                    price: iphone_variant[0].price,
                                    image: phone.gallery[0].url,
                                    quantity: Number(req.body.quantity)
                                })
                            }

                            JSON.stringify(cart);
                            // console.log(cart);
                            res.cookie('cart', cart, { signed: true });
                            req.flash("success", "Added to cart")
                            res.redirect("back");
                        }
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else if (req.params.type == "iwatch") {
            Iwatch.findOne({ pid: req.params.pid }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        var iphone_variant = phone.variants.filter((v) => {
                            return v._id == req.body.variant;
                        })
                        if (req.signedCookies['cart']) {
                            console.log(req.signedCookies.cart)

                            var cart = req.signedCookies.cart;
                            var flag = 0;
                            var stop = cart.length;
                            var done = 0;
                            if (stop == 0) {
                                if (iphone_variant[0].isInStock) {
                                    cart.push({
                                        type: "iwatch",
                                        pid: phone.pid,
                                        name: phone.name,
                                        vid: req.body.variant,
                                        size: iphone_variant[0].size,
                                        color: iphone_variant[0].color,
                                        price: iphone_variant[0].price,
                                        image: phone.gallery[0].url,
                                        v_type: iphone_variant[0].type,
                                        quantity: Number(req.body.quantity)
                                    })
                                }

                                JSON.stringify(cart);
                                // console.log(cart);
                                res.cookie('cart', cart, { signed: true });
                                req.flash("success", "Added to cart")
                                res.redirect("back");
                            }
                            cart.forEach((c) => {
                                if (c.type == "iwatch" && c.pid == req.params.pid) {
                                    if (c.vid == req.body.variant) {
                                        c.quantity = Number(req.body.quantity) + Number(c.quantity);
                                        flag = 1;
                                    }
                                }
                                done += 1;
                                if (done == stop) {
                                    if (flag == 0) {
                                        if (iphone_variant[0].isInStock) {
                                            cart.push({
                                                type: "iwatch",
                                                pid: phone.pid,
                                                name: phone.name,
                                                vid: req.body.variant,
                                                size: iphone_variant[0].size,
                                                color: iphone_variant[0].color,
                                                price: iphone_variant[0].price,
                                                image: phone.gallery[0].url,
                                                v_type: iphone_variant[0].type,
                                                quantity: Number(req.body.quantity)
                                            })
                                        }

                                    }
                                    JSON.stringify(cart);
                                    // console.log(cart);
                                    res.cookie('cart', cart, { signed: true });
                                    req.flash("success", "Added to cart")
                                    res.redirect("back");
                                }
                            })






                            //    JSON.parse(req.signedCookies.cart) 
                            // console.log(cookieParser.JSONCookie(req.signedCookies.cart))
                        } else {
                            // console.log(req.signedCookies['cart'])
                            var cart = [];
                            if (iphone_variant[0].isInStock) {
                                cart.push({
                                    type: "iwatch",
                                    pid: phone.pid,
                                    name: phone.name,
                                    vid: req.body.variant,
                                    size: iphone_variant[0].size,
                                    color: iphone_variant[0].color,
                                    price: iphone_variant[0].price,
                                    image: phone.gallery[0].url,
                                    v_type: iphone_variant[0].type,
                                    quantity: Number(req.body.quantity)
                                })
                            }

                            JSON.stringify(cart);
                            // console.log(cart);
                            res.cookie('cart', cart, { signed: true });
                            req.flash("success", "Added to cart")
                            res.redirect("back");
                        }
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else if (req.params.type == "ipod") {
            Ipod.findOne({ pid: req.params.pid }, (err, phone) => {
                if (err) {
                    console.log(err);
                    res.redirect("error");
                } else {
                    if (phone) {
                        if (req.signedCookies['cart']) {
                            console.log(req.signedCookies.cart)
                            var cart = req.signedCookies.cart;
                            var flag = 0;
                            var stop = cart.length;
                            var done = 0;
                            if (stop == 0) {
                                if (phone.isInStock) {
                                    cart.push({
                                        type: "ipod",
                                        pid: phone.pid,
                                        name: phone.name,
                                        price: phone.price,
                                        image: phone.gallery[0].url,
                                        quantity: Number(req.body.quantity)
                                    })
                                }

                                JSON.stringify(cart);
                                // console.log(cart);
                                res.cookie('cart', cart, { signed: true });
                                req.flash("success", "Added to cart")
                                res.redirect("back");
                            }
                            cart.forEach((c) => {
                                if (c.type == "ipod" && c.pid == req.params.pid) {

                                    c.quantity = Number(req.body.quantity) + Number(c.quantity);
                                    flag = 1;

                                }
                                done += 1;
                                if (done == stop) {
                                    if (flag == 0) {
                                        if (phone.isInStock) {
                                            cart.push({
                                                type: "ipod",
                                                pid: phone.pid,
                                                name: phone.name,
                                                price: phone.price,
                                                image: phone.gallery[0].url,
                                                quantity: Number(req.body.quantity)
                                            })
                                        }

                                    }
                                    JSON.stringify(cart);
                                    // console.log(cart);
                                    res.cookie('cart', cart, { signed: true });
                                    req.flash("success", "Added to cart")
                                    res.redirect("back");
                                }
                            })
                            //    JSON.parse(req.signedCookies.cart) 
                            // console.log(cookieParser.JSONCookie(req.signedCookies.cart))
                        } else {
                            // console.log(req.signedCookies['cart'])
                            var cart = [];
                            if (phone.isInStock) {
                                cart.push({
                                    type: "ipod",
                                    pid: phone.pid,
                                    name: phone.name,
                                    price: phone.price,
                                    image: phone.gallery[0].url,
                                    quantity: Number(req.body.quantity)
                                })
                            }

                            JSON.stringify(cart);
                            // console.log(cart);
                            res.cookie('cart', cart, { signed: true });
                            req.flash("success", "Added to cart")
                            res.redirect("back");
                        }
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else {
            req.flash("error", "Invalid url")
            res.redirect("/");
        }
    },
    // 
    f2uCart(req, res) {
        if (req.params.type == "iphone") {
            var cart = req.signedCookies.cart;
            cart = cart.filter((c) => {
                return c.vid != req.body.variant;
            })
            JSON.stringify(cart);
            // console.log(cart);
            res.cookie('cart', cart, { signed: true });
            res.redirect("back");

        } else if (req.params.type == "iwatch") {
            var cart = req.signedCookies.cart;
            cart = cart.filter((c) => {
                return c.vid != req.body.variant;
            })
            JSON.stringify(cart);
            // console.log(cart);
            res.cookie('cart', cart, { signed: true });
            res.redirect("back");
        } else if (req.params.type == "ipod") {
            var cart = req.signedCookies.cart;
            cart = cart.filter((c) => {
                return c.pid != req.params.pid;
            })
            JSON.stringify(cart);
            // console.log(cart);
            res.cookie('cart', cart, { signed: true });
            res.redirect("back");
        } else {
            req.flash("error", "Invalid url")
            res.redirect("/");
        }
    },

    f3uCart(req, res) {
        var cart_total = 0;
        req.signedCookies.cart.forEach((c) => {
            cart_total += c.price * c.quantity;
        })
        if(req.signedCookies.cart.length){
            Pincode.findOne({}, (err, pin) => {
                if (err) {
                    console.log(err)
                    req.flash("error", "Database Error")
                    res.redirect("back")
                } else {
                    if (pin) {
                        res.render("checkout", { cart: req.signedCookies.cart, cart_total: cart_total, codes: pin.codes });
                    } else {
                        Pincode.create({}, (err, pin) => {
                            if (err) {
                                console.log(err)
                                req.flash("error", "Database Error")
                                res.redirect("back")
                            } else {
                                res.render("checkout", { cart: req.signedCookies.cart, cart_total: cart_total, codes: pin.codes });
                            }
                        })
                    }
                }
            })
    
        }else{
            req.flash("error","Cart empty!")
            res.redirect("/")
        }
       
    },

    f4uCart(req, res) {
        if(req.signedCookies.cart.length){
            Pincode.findOne({}, (err, pin) => {
                if (err) {
                    console.log(err);
                    res.redirect("/error");
                } else {
                    var stop = req.signedCookies.cart.length;
                    var done = 0;
                    var flag = 0;
                    var cart = req.signedCookies.cart;
                    console.log(cart)
                    var bar = new Promise((resolve, reject) => {
                        req.signedCookies.cart.forEach((c, i) => {
                            if (c.type == "iphone") {
                                Iphone.findOne({ pid: c.pid }, (err, phone) => {
                                    if (err) {
                                        cart = cart.filter((ct) => {
                                            if (ct.pid == c.pid && ct.vid == c.vid) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        flag = 1;
                                        done++;
                                        if (stop == done) {
                                            resolve();
                                        }
    
                                    } else {
                                        if (phone) {
                                            console.log("ph");
                                            var v = phone.variants.filter((v) => {
                                                return v._id == c.vid;
                                            })
                                            if (!v.length) {
                                                cart = cart.filter((ct) => {
                                                    if (ct.pid == c.pid && ct.vid == c.vid) {
                                                        return false;
                                                    }
                                                    return true;
                                                })
                                                flag = 1;
                                                done++;
                                                if (stop == done) {
                                                    resolve();
                                                }
                                            } else {
                                                if (v[0].isInStock) {
                                                    done++;
                                                    if (stop == done) {
                                                        resolve();
                                                    }
                                                } else {
    
                                                    cart = cart.filter((ct) => {
                                                        if (ct.pid == c.pid && ct.vid == c.vid) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })
                                                    flag = 1;
                                                    done++;
                                                    if (stop == done) {
                                                        resolve();
                                                    }
                                                }
    
                                            }
                                            console.log(done)
                                        } else {
                                            cart = cart.filter((ct) => {
                                                if (ct.pid == c.pid) {
                                                    return false;
                                                }
                                                return true;
                                            })
                                            flag = 1;
                                            done++;
                                            if (stop == done) {
                                                resolve();
                                            }
                                        }
                                    }
                                })
                            } else if (c.type == "iwatch") {
                                Iwatch.findOne({ pid: c.pid }, (err, phone) => {
                                    if (err) {
                                        cart = cart.filter((ct) => {
                                            if (ct.pid == c.pid && ct.vid == c.vid) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        flag = 1;
                                        done++;
                                        if (stop == done) {
                                            resolve();
                                        }
    
                                    } else {
                                        if (phone) {
                                            console.log("wt")
                                            var v = phone.variants.filter((v) => {
                                                return v._id == c.vid;
                                            })
                                            console.log(v)
                                            if (!v.length) {
    
                                                cart = cart.filter((ct) => {
                                                    if (ct.pid == c.pid && ct.vid == c.vid) {
                                                        return false;
                                                    }
                                                    return true;
                                                })
                                                flag = 1;
                                                done++;
                                                if (stop == done) {
                                                    resolve();
                                                }
                                            } else {
                                                if (v[0].isInStock) {
                                                    done++;
                                                    if (stop == done) {
                                                        resolve();
                                                    }
                                                } else {
    
                                                    cart = cart.filter((ct) => {
                                                        if (ct.pid == c.pid && ct.vid == c.vid) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })
                                                    flag = 1;
                                                    done++;
                                                    if (stop == done) {
                                                        resolve();
                                                    }
                                                }
    
                                            }
                                            console.log(done)
                                        } else {
                                            cart = cart.filter((ct) => {
                                                if (ct.pid == c.pid) {
                                                    return false;
                                                }
                                                return true;
                                            })
                                            flag = 1;
                                            done++;
                                            if (stop == done) {
                                                resolve();
                                            }
                                        }
                                    }
                                })
                            } else {
                                Ipod.findOne({ pid: c.pid }, (err, phone) => {
                                    if (err) {
                                        cart = cart.filter((ct) => {
                                            if (ct.pid == c.pid) {
                                                return false;
                                            }
                                            return true;
                                        })
                                        flag = 1;
                                        done++;
                                        if (stop == done) {
                                            resolve();
                                        }
    
                                    } else {
                                        if (phone) {
                                            console.log("a")
                                            if (!phone.isInStock) {
                                                cart = cart.filter((ct) => {
                                                    if (ct.pid == c.pid) {
                                                        return false;
                                                    }
                                                    return true;
                                                })
                                                flag = 1;
                                                done++;
                                                if (stop == done) {
                                                    resolve();
                                                }
                                            } else {
                                                done++;
                                                if (stop == done) {
                                                    resolve();
                                                }
                                            }
                                            console.log(done)
                                        } else {
                                            cart = cart.filter((ct) => {
                                                if (ct.pid == c.pid) {
                                                    return false;
                                                }
                                                return true;
                                            })
                                            flag = 1;
                                            done++;
                                            if (stop == done) {
                                                resolve();
                                            }
                                        }
                                    }
                                })
                            }
    
                        })
                    });
                    bar.then(() => {
                        // if (done == stop) {
                        console.log(flag)
                        if (flag) {
                            JSON.stringify(cart);
                            res.cookie('cart', cart, { signed: true });
                            req.flash("error", "One or more item out of stock")
                            res.redirect("/")
                        } else {
                            var date1 = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
                            // console.log(date1)
                            var cart_total = 0;
                            req.signedCookies.cart.forEach((c) => {
                                cart_total += c.price * c.quantity;
                            })
                            var tax = parseInt(0.0195 * cart_total);
                            var p = [];
                            var o;
    
                            req.signedCookies.cart.forEach((c) => {
                                if (c.type == "iphone") {
                                    o = {
                                        product_id: c.pid,
                                        name: c.name,
                                        description: "(" + c.storage + ")",
                                        price: Number(c.price),
                                        quantity: Number(c.quantity),
                                        type: "Phone"
                                    };
                                    p.push(o)
                                } else if (c.type == "iwatch") {
                                    o = {
                                        product_id: c.pid,
                                        name: c.name,
                                        description: "(" + c.size + "," + c.v_type + ")",
                                        price: Number(c.price),
                                        quantity: Number(c.quantity),
                                        type: "Watch"
                                    }
                                    p.push(o)
                                } else {
                                    o = {
                                        product_id: c.pid,
                                        name: c.name,
                                        price: Number(c.price),
                                        quantity: Number(c.quantity),
                                        type: "Airpod"
                                    }
                                    p.push(o)
    
                                }
                            })
                            var orderid = Math.floor(Math.random() * 90000) + 10000;
                            while (pin.orderids.includes(orderid)) {
                                orderid = Math.floor(Math.random() * 90000) + 10000;
                            }
                            pin.orderids.push(orderid);
    
                            // console.log(typeof p[0].name);
                            var order = {
                                oid: orderid,
                                isPaid: false,
                                products: p,
                                date_purchased: date1,
                                tax: tax,
                                order_progress: "new",
                                status: "",
                                username: req.body.username,
                                mobile: Number(req.body.mobile),
                                email: req.body.email,
                                add_1: req.body.add_1,
                                add_2: req.body.add_2,
                                city: req.body.city,
                                state: req.body.state,
                                color:req.body.order_color,
                                total_paid: cart_total + tax + 500,
                                pincode: Number(req.body.pincode)
                            }
                            // console.log(order.products.length)
                            Order.create(order, (err, norder) => {
                                if (err) {
                                    // console.log(err);
                                    res.redirect("/error");
                                } else {
                                    // console.log(norder);
                                    norder.save();
                                    pin.save();
                                    // var cart=[];
                                    // JSON.stringify(cart);
                                    // // console.log(cart);
                                    // res.cookie('cart', cart,{maxAge:24*60*60*1000});
                                    //    res.redirect("/order-details/"+norder.oid);
                                    console.log(norder.color);
    
    
                                    res.redirect("/cart/proceed-to-payment/" + norder.oid);
                                }
                            })
    
                        }
                        // }
                    })
    
    
                }
            })
    
        }else{
            req.flash("error","Cart empty!")
            res.redirect("/")
        }
        
    },

    f5uCart(req, res) {
        Order.findOne({ oid: req.params.oid, isPaid: false }, (err, order) => {
            if (err) {
                console.log(err);
                res.redirect("/error");
            } else {
                if (order) {
                    var data = {
                        appId: process.env.cashfree_appid,
                        orderId: order.oid,
                        orderAmount: order.total_paid,
                        customerName: order.username,
                        customerPhone: order.mobile,
                        customerEmail: order.email,
                        orderCurrency: "INR",
                        orderNote: "Marvans Mobile",
                        returnUrl: 'https://' + req.headers.host + '/payment-status/'
                    }
                    var keys = Object.keys(data);
                    keys.sort();
                    signatureData = "";
                    keys.forEach((key) => {
                        signatureData += key + data[key];
                    });
                    var secretKey = process.env.cashfree_secret;
                    var signature = crypto.createHmac('sha256', secretKey).update(signatureData).digest('base64');
                    res.render("confirm_order", { data: data, signature: signature });
                } else {
                    res.redirect("/");
                }
            }
        })
    }
}