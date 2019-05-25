const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const upload = require("express-fileupload");
const methodOverride = require("method-override");

// bodyparser JSON
app.use(express.urlencoded({ extended: false }));

// render public
app.use(express.static(path.join(__dirname, "public")));

// set exphbs
const { select } = require("./config/selectCategory");
const { generateDate } = require("./config/generateDate");
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "Home",
    helpers: { generateDate: generateDate, select: select }
  })
);
app.set("view engine", ".hbs");

// set mongoose
mongoose
  .connect("mongodb://localhost:27017/warung", { useNewUrlParser: true })
  .then(() => console.log("berhasil terkoneksi database"))
  .catch(err => console.log(err));

mongoose.set("useFindAndModify", false);

// set flash
app.use(flash());

// set express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Global variables Connect Flash
app.use((req, res, next) => {
  res.locals.error_message = req.flash("error_message");
  res.locals.success_message = req.flash("success_message");
  // Catch error from passport js
  res.locals.error = req.flash("error");
  next();
});

// passport config
require("./config/passport")(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set express upload middleware
app.use(upload());

// set method override
app.use(methodOverride("_method"));

// render User/Dashboard
app.use("/user/dashboard/", require("./routers/Dashboard/Dashboard"));

// render User/Category
app.use("/user/dashboard/category", require("./routers/Dashboard/Category"));

// render User/Post
app.use("/user/dashboard/post", require("./routers/Dashboard/Post"));

// render User/PostIndex
app.use("/user/dashboard/postindex", require("./routers/Dashboard/PostIndex"));

// render User/Dashborad/IndexComments
app.use("/user/dashboard/commentindex", require("./routers/Dashboard/Comment"));

// render blog/Comment
app.use("/user/comment", require("./routers/Blogpage/Comment"));

// render Home
app.use("/", require("./routers/Home/Home"));

// render page display
app.use("/page", require("./routers/Blogpage/display"));

app.listen(4500, () => console.log("berhasil berjalan di localhost:4500"));
