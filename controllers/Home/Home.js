// module
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const passport = require("passport");

// models
const Post = require("../../models/User/Post");
const Category = require("../../models/User/Category");
const User = require("../../models/User/User");

// page homepag
exports.renderHome = (req, res) => {
  Post.find({})
    .populate("category")
    .then(renderPost => {
      Category.find({}).then(category => {
        res.render("home/home", { renderPost: renderPost, category: category });
      });
    });
};

// page register
exports.registerUser = (req, res, next) => {
  const { username, email, password } = req.body;

  // validate Page User
  const validatorUser = require("../../validators/Home/User");

  // validate Home

  const newUser = new User({
    username,
    email,
    password
  });

  const resultRegister = Joi.validate(req.body, validatorUser);

  if (resultRegister.error) {
    res.render("Home/register", {
      username,
      email
    });
    req.flash("error_message", resultRegister.error.details[0].message);
    return;
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        req.flash("error_message", "Email already exists");
        res.redirect("/register");
        return;
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_message",
                  "berhasil di registrasi silahakan login"
                );
                res.redirect("/register");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

exports.renderRegisterUser = (req, res) => {
  res.render("Home/Register");
};

// Page Login
exports.renderLogin = (req, res) => {
  res.render("home/login");
};

exports.loginUser = (req, res, next) => {
  const LoginUser = require("../../validators/Home/Login");
  const resultLogin = Joi.validate(req.body, LoginUser);

  response = {
    email: req.body.email
  };

  if (resultLogin.error) {
    req.flash("error_message", resultLogin.error.details[0].message);
    res.render("Home/Login", response);
    return;
  } else {
    passport.authenticate("local", {
      successRedirect: "/user/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success_message", "You are Loggged Out");
  res.redirect("/login");
};

exports.about = (req, res) => {
  res.render("Home/about");
};
