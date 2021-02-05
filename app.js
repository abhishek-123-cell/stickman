const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  flash = require("connect-flash"),
  Admin = require("./models/admin"),
  // db = require("./config/mongoose"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  methodOverride = require("method-override"),
  port = process.env.PORT || 4001,
  dotenv = require("dotenv"),
  passportLocalMongoose = require("passport-local-mongoose");
var sslRedirect = require("heroku-ssl-redirect");
dotenv.config();

// app config-----
app.use(cookieParser("secret"));
app.use(
  require("express-session")({
    secret: "This is a marketing panel",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "strict",
    },
  })
);
app.use(express.static(__dirname + "/public/"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(sslRedirect());
// Require Routes================================

var userHomeRoutes = require("./routes/home"),
  userProductRoutes = require("./routes/product"),
  userCartRoutes = require("./routes/cart"),
  userItemRoutes = require("./routes/item");

// mongoose config
// mongoose.connect("mongodb://localhost/stickman_real_art");
// const mongoURI = "mongodb://localhost/stickman_apple_v1";
// const mongoURI = "mongodb+srv://ankit:"+process.env.MLAB_PASS+"@cluster0-gyowo.mongodb.net/real_art?retryWrites=true&w=majority";
const mongoURI =
  "mongodb+srv://ankit:" +
  process.env.mongo_pass +
  "@cluster0.f8aql.mongodb.net/mravans_admin_v1?retryWrites=true&w=majority";
// "mongodb+srv:new-user-123:" +
// process.env.mongo_pass +
// "@cluster0.cdfzc.mongodb.net/e-commerceWebsite?retryWrites=true&w=majority";
//Mongo connection
// const mongoURI =
//   // "mongodb+srv://ankit:" +
//   // process.env.mongo_pass +
//   // "@cluster0.f8aql.mongodb.net/mravans_admin_v1?retryWrites=true&w=majority";
//   "mongodb+srv://new-user-123:+process.env.mongo_pass+@cluster0.cdfzc.mongodb.net/mravans_admin_v1?retryWrites=true&w=majority";
// //Mongo connection
mongoose.connect(mongoURI);
// mongoose.connect(mongoURI);
// mongoose
//   .connect(
//     `mongodb+srv://abhi-123-123:123@123aA@cluster0.cdfzc.mongodb.net/e-commerceWebsite?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     }
//   )
//   .then(() => console.log("DB Connected"));

//PASSPORT config

// passport.use('admin', new localStrategy(Admin.authenticate()));
passport.use(
  "admin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    Admin.authenticate()
  )
);
// passport.use('employee', new localStrategy(Employee.authenticate()));
passport.serializeUser(function (user, done) {
  var key = {
    id: user.id,
    type: user.typeof,
  };
  done(null, key);
});
passport.deserializeUser(function (key, done) {
  if (key.type === "admin") {
    Admin.findOne(
      {
        _id: key.id,
      },
      function (err, user) {
        done(err, user);
      }
    );
  }
});

// Use Routes======================
app.use("/", userHomeRoutes);
app.use("/products", userProductRoutes);
app.use("/cart", userCartRoutes);
app.use("/product", userItemRoutes);

app.get("*", (req, res) => {
  res.redirect("/");
  // res.render("error")
});

app.listen(port, () => {
  console.log("Server Started on " + port);
});
